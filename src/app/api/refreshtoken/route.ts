import { decodeToken, verifyToken } from "@/services/token";

// ✅ Allowed frontend origins
const allowedOrigins = ['http://localhost:5173', 'https://inxource.com'];

// ✅ Dynamic CORS header generator
function getCorsHeaders(request: Request): Record<string, string> {
    const origin = request.headers.get('origin') || '';
    const isAllowed = allowedOrigins.includes(origin);

    const headers: Record<string, string> = {
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
    };

    if (isAllowed) {
        headers['Access-Control-Allow-Origin'] = origin;
    }

    return headers;
}

export async function OPTIONS(request: Request) {
    return new Response(null, {
        status: 204,
        headers: getCorsHeaders(request),
    });
}

export async function POST(request: Request) {
    const headers = getCorsHeaders(request);

    try {
        const { token } = await request.json();
        const gottentoken = verifyToken(token);

        return new Response(JSON.stringify({ token: gottentoken }), {
            status: 200,
            headers,
        });
    } catch (err) {
        console.error("Token verification error:", err);
        return new Response(JSON.stringify({ token: "error somewhere" }), {
            status: 500,
            headers,
        });
    }
}
