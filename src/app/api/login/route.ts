import { supabase } from "@/services/SupabaseConfig";
import { generateToken } from "@/services/token";


export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        },
    });
}


export async function POST(request: Request) {
    const { email, password } = await request.json();

    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (!data) {
        console.log('user does not exist')
        }

        const isMatch = password === data.password_hash;

        if(isMatch){
            const Token = generateToken(data, '24h')
            return new Response(
                JSON.stringify({ message: 'Login successful', Token:Token, userdata:data }),
                {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:5173',
                        'Access-Control-Allow-Credentials': 'true',
                    },
                }
            );
        }
    }
    catch (err) {
        console.error("Unexpected error fetching customer:", err);
    }

    return new Response(JSON.stringify({ message: 'Invalid credentials' }), {
        status: 401,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:5173',
            'Access-Control-Allow-Credentials': 'true',
        },
    });
}