export async function POST(req) {
    try {
      const { user_id, user_name, question } = await req.json();
      console.log("📨 Payload:", { user_id, user_name, question });
  
      const response = await fetch("http://127.0.0.1:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id, user_name, question }),
      });
  
      if (!response.ok) throw new Error(`FastAPI error: ${response.statusText}`);
      const data = await response.json();
  
      return new Response(JSON.stringify({ response: data.response }), { status: 200 });
    } catch (error) {
      console.error("❌ Next.js API error:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
    }
  }
  
  
// export async function POST(req) {
//     try {
//         const { user_id, question } = await req.json();

//         console.log("📦 Payload from frontend:", { user_id, question });

//         const response = await fetch("http://127.0.0.1:8000/query", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ user_id: String(user_id), question }),
//         });

//         if (!response.ok) throw new Error(`FastAPI error: ${response.statusText}`);

//         const data = await response.json();
//         return new Response(JSON.stringify({ response: data.response }), { status: 200 });
//     } catch (error) {
//         console.error("❌ Next.js API error:", error);
//         return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
//     }
// }


// // src/app/api/query/route.js
// export async function POST(req) {
//     try {
//         const { user_id, question } = await req.json();

//         const response = await fetch("http://127.0.0.1:8000/query", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ user_id: String(user_id), question }),
//         });

//         if (!response.ok) throw new Error(`FastAPI error: ${response.statusText}`);

//         const data = await response.json();
//         return new Response(JSON.stringify({ response: data.response }), { status: 200 });
//     } catch (error) {
//         console.error("❌ Next.js API error:", error);
//         return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
//     }
// }



// export async function POST(req) {
//     try {
//         const { user_id, question } = await req.json();

//         const response = await fetch("http://127.0.0.1:8000/query", {  // FastAPI endpoint
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ user_id, question }),
//         });

//         if (!response.ok) {
//             throw new Error(`FastAPI returned an error: ${response.statusText}`);
//         }

//         const data = await response.json();
//         return new Response(JSON.stringify({ response: data.response }), { status: 200 });
//     } catch (error) {
//         console.error("Error in Next.js API:", error);
//         return new Response(JSON.stringify({ error: "Failed to fetch response from FastAPI" }), { status: 500 });
//     }
// }
