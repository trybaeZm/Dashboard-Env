import { decodeToken, verifyToken } from "@/services/token";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // ✅ Set your frontend origin
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true', // ✅ This is needed for cookies/auth headers
};
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders,
    });
}

export async function POST(request: Request) {
    const {  token } = await request.json();
    try {
        const gottentoken = verifyToken(token)
      
        return new Response(JSON.stringify({ token: gottentoken }), {
            status: 200,
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json',
            },
        });
    }
    catch {
          return new Response(JSON.stringify({ token: "error somewhere" }), {
            status: 500,
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json',
            },
        });
    }
}