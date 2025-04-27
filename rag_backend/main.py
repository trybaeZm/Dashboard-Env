
from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from uuid import uuid4
import os
import json
from dotenv import load_dotenv
from supabase import create_client, Client
import google.generativeai as genai
import requests

# === Load .env ===
load_dotenv()
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
SUPABASE_BUCKET = "uploaded-files"
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)
genai.configure(api_key=GEMINI_API_KEY)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Models ===
class QueryRequest(BaseModel):
    user_id: str
    user_name: str
    question: str
    session_id: str

# === File Upload ===
@app.post("/api/upload-file")
async def upload_file(file: UploadFile = File(...), user_id: str = Form(...), user_name: str = Form(...)):
    try:
        file_id = str(uuid4())
        ext = file.filename.split(".")[-1]
        file_path = f"{user_id}/{file_id}.{ext}"
        content = await file.read()

        supabase.storage.from_(SUPABASE_BUCKET).upload(file_path, content, file_options={"content-type": file.content_type})
        file_url = supabase.storage.from_(SUPABASE_BUCKET).get_public_url(file_path).get("publicUrl")

        supabase.table("uploaded_files").insert({
            "id": file_id,
            "user_id": user_id,
            "user_name": user_name,
            "file_name": file.filename,
            "file_type": file.content_type,
            "file_url": file_url,
            "uploaded_at": datetime.utcnow().isoformat()
        }).execute()

        return {"status": "success", "url": file_url, "file_name": file.filename}
    except Exception as e:
        return {"status": "error", "message": str(e)}

# === Ensure User + Business Data ===
def ensure_user_exists(user_id: str, user_name: str):
    try:
        exists = supabase.table("users").select("*").eq("id", user_id).execute()
        if not exists.data:
            supabase.table("users").insert({
                "id": user_id,
                "name": user_name,
                "email": f"{user_name.lower()}@autogen.com",
                "password_hash": "Temp123",
                "role": "user"
            }).execute()
            create_initial_business_data(user_id, user_name)
    except Exception as e:
        print("🚨 User creation error:", e)

def create_initial_business_data(user_id: str, user_name: str):
    try:
        supabase.table("ai_aggregated_data").insert({
            "user_id": user_id,
            "business_id": user_id,
            "user_name": user_name,
            "customer_count": 5,
            "total_sales": 12000,
            "total_orders": 10,
            "most_purchased_product": "iPhone 14 Pro",
            "customer_behavior": json.dumps({
                "peak_hours": "2 PM - 5 PM",
                "popular_locations": ["Karachi", "Lahore"]
            }),
            "revenue_forecast": json.dumps({
                "next_month": "$2000",
                "next_year": "$25000"
            }),
            "last_updated": datetime.utcnow().isoformat()
        }).execute()
    except Exception as e:
        print("🚨 Business data error:", e)

# === Chat History Store ===
def store_chat_history(user_id, business_id, question, answer, session_id, user_name=None):
    try:
        now = datetime.utcnow().isoformat()
        supabase.table("conversations").insert({
            "user_id": user_id,
            "customer_id": business_id,
            "user_name": user_name,
            "session_id": session_id,
            "question": question,
            "answer": answer,
            "started_at": now,
            "last_updated": now
        }).execute()
    except Exception as e:
        print("❌ Chat store error:", e)

def fetch_sales_data(user_id):
    try:
        res = supabase.table("ai_aggregated_data").select("*").eq("user_id", user_id).execute()
        return res.data[0] if res.data else None
    except Exception as e:
        print("❌ Supabase fetch error:", e)
        return None

# === Gemini Logic ===
def query_rag_ai(user_id, user_query, user_name=None, file_context=None, session_id=None):
    user_data = fetch_sales_data(user_id)
    if not user_data:
        return "❌ No business data found."

    try:
        customer_behavior = json.loads(user_data.get("customer_behavior", "{}"))
        revenue_forecast = json.loads(user_data.get("revenue_forecast", "{}"))
    except:
        customer_behavior, revenue_forecast = {}, {}

    

    # 🎯 Add Your System Prompt Here
    SYSTEM_PROMPT = """
You are Upturn's AI chatbot, a friendly expert designed to help SMEs analyze their sales data and make data-driven decisions.
Your goal is to interpret dashboard data, provide quick summaries, and guide users with actionable insights.
Use a casual, approachable tone while avoiding technical jargon. 
Clarify vague queries, personalize answers using user's name and preferences, and suggest alternative resources if needed.

Always follow this structure:
- Quick Summary first
- Optional deeper detail (ask first)
- Actionable Advice
- Personalization (use user's name if available)
- Acknowledge Limitations when needed

Example patterns:
- "Your revenue increased by 10% this month! 🎉 Want me to break it down by product?"
- "It looks like Region X is outperforming others. Would you like insights to boost Region Y?"
- "I'm unable to track expenses, but tools like QuickBooks can help."

Handle unclear queries by asking clarifying questions:
User: "Tell me about sales."
Bot: "Would you like a trend, product-wise breakdown, or regional performance?"

Never reply without either answering, suggesting, or politely saying what you can or cannot do.
"""

    # 🎯 Business Context and User Query
    business_context = f"""
📁 File:
{file_context or "No uploaded file."}

📊 Business Data:
- Name: {user_name}
- Total Sales: ${user_data.get("total_sales")}
- Total Orders: {user_data.get("total_orders")}
- Popular Hours: {customer_behavior.get("peak_hours")}
- Popular Locations: {customer_behavior.get("popular_locations")}
- Revenue Forecast Next Month: {revenue_forecast.get("next_month")}
    """

    full_prompt = f"""
{SYSTEM_PROMPT}

---

{business_context}

---

User's Question: {user_query}
"""

    # 🎯 Send it to Gemini
    model = genai.GenerativeModel("gemini-2.0-flash")
    result = model.generate_content(full_prompt)
    answer = result.text.strip() if hasattr(result, "text") else "🤖 No response."

    store_chat_history(user_id, user_data["business_id"], user_query, answer, session_id, user_name)
    return answer
# === Query Endpoint ===


@app.post("/query")
async def query_endpoint(request: QueryRequest):
    try:
        ensure_user_exists(request.user_id, request.user_name)

        file_context = ""  # not needed anymore

        result = query_rag_ai(
            request.user_id,
            request.question,
            request.user_name,
            file_context,
            request.session_id
        )

        return {"response": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



# === Chat Session Endpoint ===
@app.get("/chat-session")
async def get_chat_session(user_id: str, session_id: str):
    try:
        res = supabase.table("conversations") \
            .select("question, answer") \
            .eq("user_id", user_id) \
            .eq("session_id", session_id) \
            .order("last_updated", desc=False) \
            .execute()
        return {"session": res.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))



# === Recent Sessions ===
@app.get("/recent-questions")
async def get_recent_questions(user_id: str):
    try:
        res = supabase.table("conversations") \
            .select("session_id, question, last_updated") \
            .eq("user_id", user_id) \
            .order("last_updated", desc=True) \
            .execute()

        seen_sessions = set()
        unique_sessions = []

        for row in res.data:
            if row["session_id"] not in seen_sessions:
                seen_sessions.add(row["session_id"])
                unique_sessions.append(row)
            if len(unique_sessions) == 5:
                break

        return {"recent": unique_sessions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# === All History (Optional) ===
@app.get("/chat-history")
async def get_chat_history(user_id: str):
    try:
        res = supabase.table("conversations") \
            .select("question, answer") \
            .eq("user_id", user_id) \
            .order("last_updated", desc=False) \
            .execute()
        return {"history": res.data}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

