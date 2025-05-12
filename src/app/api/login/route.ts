import { supabase } from "@/services/SupabaseConfig";
import { generateToken } from "@/services/token";
import bcrypt from 'bcrypt';



const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://localhost:5173', // ✅ Set your frontend origin
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
    const { email, password } = await request.json();
    try {
        let lowerCaseEmail = email.toLowerCase()
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', lowerCaseEmail)
            .single();

        if (!data) {
            console.log('user does not exist')
        }

        // Example: comparing during login
        const isMatch = await bcrypt.compare(password, data.password_hash);

        if (isMatch) {
            const Token = generateToken(data, '24h')
            return new Response(
                JSON.stringify({ message: 'Login successful', Token: Token, userdata: data }),
                {
                    status: 200,
                    headers: {
                        ...corsHeaders,
                        'Content-Type': 'application/json',
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
            ...corsHeaders,
            'Content-Type': 'application/json',
        },
    });
}