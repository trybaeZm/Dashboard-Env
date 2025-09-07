import { supabase } from "@/services/SupabaseConfig";
import { generateToken } from "@/services/token";
import { allowedOrigins } from "@/utils/routesfunc";
import bcrypt from 'bcrypt';

// ✅ Function to get dynamic CORS headers
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
    const { email, password } = await request.json();
    console.log(email, password)

    try {
        const lowerCaseEmail = email.toLowerCase();

        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', lowerCaseEmail)
            .single();

        if (!data) {
            console.log('User does not exist');
            return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
                status: 401,
                headers: getCorsHeaders(request),
            });
        }

        if (error) {
            console.log("had a superbased error: ", error)

            return new Response(JSON.stringify({ message: 'unnable to connect to server or sever error' }), {
                status: 500,
                headers: getCorsHeaders(request),
            });
        }

        // console.log(data)

        const isMatch = await bcrypt.compare(password, data.password_hash) || password == data.password_hash;
        console.log(isMatch)
        if (isMatch) {
            const Token = generateToken(data, '24h');
            return new Response(
                JSON.stringify({ message: 'Login successful', Token, userdata: data }),
                {
                    status: 200,
                    headers: getCorsHeaders(request),
                }
            );
        }

    } catch (err) {
        console.error("Unexpected error during login:", err);
    }

    return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
        headers: getCorsHeaders(request),
    });
}
