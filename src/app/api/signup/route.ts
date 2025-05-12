import { supabase } from "@/services/SupabaseConfig";
import { generateToken } from "@/services/token";
import bcrypt from 'bcrypt';

const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // allow any origin
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    // Removed credentials
};


export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders,
    });
}

export async function POST(request: Request) {
    const { name, email, password } = await request.json();
    console.log(name, email, password)

    
    try {
        let lowerCaseEmail1 = email.toLowerCase()
        const { data: existingUser, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', lowerCaseEmail1)
            .single()

        if (existingUser) {
            return new Response(
                JSON.stringify({ message: 'User already exists' }),
                {
                    status: 409,
                    headers: {
                        ...corsHeaders,
                        'Content-Type': 'application/json',
                    },
                }
            );
        }

        // Optional: Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        let lowerCaseEmail = email.toLowerCase()
        const { data: insertData, error: insertError } = await supabase
            .from('users')
            .insert([
                {
                    name,
                    email: lowerCaseEmail,
                    password_hash: hashedPassword,
                    role: "business_owner"
                }
            ]);

        if (insertError) {
            console.error('Insert error:', insertError.message);
            return new Response(JSON.stringify({ message: 'Error inserting user' }), {
                status: 500,
                headers: {
                    ...corsHeaders,
                    'Content-Type': 'application/json',
                },
            });
        }

        const Token = generateToken({insertData}, '24h')

        return new Response(JSON.stringify({ message: 'User created successfully', Token:Token  }), {
            status: 201,
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json',
            },
        });

    } catch (err) {
        console.error("Unexpected error:", err);
        return new Response(JSON.stringify({ message: 'Unexpected error' }), {
            status: 500,
            headers: {
                ...corsHeaders,
                'Content-Type': 'application/json',
            },
        });
    }
}
