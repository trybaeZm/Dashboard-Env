import { supabase } from './../SupabaseConfig';

interface User {
    id?: string;
    name: string;
    email: string;
    password_hash?: string;
    role: 'admin' | 'user'; 
    status?: 'active' | 'inactive';
    mfa_enabled?: boolean;
    mfa_secret?: string;
    created_at?: string;
}

export async function signUpUser(name: string, email: string, password: string, role: 'admin' | 'user' = 'user'): Promise<User | null> {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            console.error("Error signing up:", error.message);
            return null;
        }

        const { data: userData, error: dbError } = await supabase
            .from('users')
            .insert([{ id: data.user?.id, name, email, role, status: 'active' }])
            .select()
            .single();

        if (dbError) {
            console.error("Error storing user in DB:", dbError.message);
            return null;
        }

        return userData;
    } catch (err) {
        console.error("Unexpected error signing up:", err);
        return null;
    }
}

export async function signInUser(email: string, password: string): Promise<boolean> {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            console.error("Error signing in:", error.message);
            return false;
        }

        return !!data.session;
    } catch (err) {
        console.error("Unexpected error signing in:", err);
        return false;
    }
}

export async function resetPassword(email: string): Promise<boolean> {
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            console.error("Error sending password reset email:", error.message);
            return false;
        }

        return true;
    } catch (err) {
        console.error("Unexpected error sending reset email:", err);
        return false;
    }
}

export async function getUsers(): Promise<User[] | null> {
    try {
        const { data, error } = await supabase.from('users').select('*');

        if (error) {
            console.error("Error fetching users:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error fetching users:", err);
        return null;
    }
}

export async function getUserById(id: string): Promise<User | null> {
    try {
        const { data, error } = await supabase.from('users').select('*').eq('id', id).single();

        if (error) {
            console.error("Error fetching user:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error fetching user:", err);
        return null;
    }
}

export async function updateUser(id: string, updatedData: Partial<User>): Promise<User | null> {
    try {
        const { data, error } = await supabase.from('users').update(updatedData).eq('id', id).select().single();

        if (error) {
            console.error("Error updating user:", error.message);
            return null;
        }

        return data;
    } catch (err) {
        console.error("Unexpected error updating user:", err);
        return null;
    }
}

export async function deleteUser(id: string): Promise<boolean> {
    try {
        const { error } = await supabase.from('users').delete().eq('id', id);

        if (error) {
            console.error("Error deleting user:", error.message);
            return false;
        }

        return true;
    } catch (err) {
        console.error("Unexpected error deleting user:", err);
        return false;
    }
}
