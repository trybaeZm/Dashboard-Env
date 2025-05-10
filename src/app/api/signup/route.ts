import { supabase } from "@/services/SupabaseConfig";
import { generateToken } from "@/services/token";
import bcrypt from 'bcrypt';


export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            'Access-Control-Allow-Origin': 'http://localhost:5173',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Allow-Credentials': 'true',
        },
    });
}




export async function POST(request: Request) {
    const { name, email, password } = await request.json();

    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (data) {
            return new Response(
                JSON.stringify({ message: 'user Already exists' }),
                {
                    status: 409,
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'http://localhost:5173',
                        'Access-Control-Allow-Credentials': 'true',
                    },
                }
            );
        } else {

            const { data, error } = await supabase
                .from('users')
                .insert([
                    {
                        name, email, password
                    }
                ])

            console.log('Inserted:', data);
        }

        if (error) {
            console.error('Insert error:', error.message);
            return;
        }

    }
    catch (err) {
        console.error("Unexpected error fetching customer:", err);
        return new Response(JSON.stringify({ message: 'Unexpected error adding customer:' }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'http://localhost:5173',
                'Access-Control-Allow-Credentials': 'true',
            },
        });

    }
}