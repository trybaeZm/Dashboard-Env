import { supabase } from "./SupabaseConfig";

interface UserProfile {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  profile_pic?: string;
  gender?: string;
  [key: string]: any;
}

export async function authSignup(email:string,password:string){
  
  let { data, error } = await supabase.auth.signUp({
    email,
    password
  })


if(error){
  console.log(error);
  throw new Error("an error occured while registering user")
} 

return data;

}

// Function to add user profile to the profiles table
export const createUserProfile = async (
  userId:string,
  firstname:string,
  lastname:string,
  gender:string,

) => {
  const { data,error } = await supabase.from('Profile').insert([
    {
      user_id: userId, // Use the user ID from the auth.users table
      firstname,
      lastname,
      gender,
    },
  ]);

  if (error) {
    console.log(error);
    throw new Error("Profile creation failed")} // Handle profile creation error
};

export async function authSignIn(email:string,password:string){
  
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

if(error){console.log(error);
  throw new Error(error?.message ||"an error occured while signing in user")} 

  const userId = data?.user?.id;

    // Step 2: Fetch the user profile from the `profiles` table
    const { data: profileData, error: profileError } = await supabase
    .from('Profile')
    .select('*')
    .eq('id', userId)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  // Combine the authentication data and profile data
  return {
    user: data?.user,
    profile: profileData as UserProfile,
  };
}
export async function authSignOut(email:string, password:string){
  let { error } = await supabase.auth.signOut()

if(error){console.log(error);
  throw new Error("an error occured while signing in user")} 
}
export async function authPasswordReset(email:string){
  
  let { data, error } = await supabase.auth.resetPasswordForEmail(email)

if(error){console.log(error);
  throw new Error("an error occured while signing in user")} 
return data;
}
export async function authUpdateUser(){
  const { data, error } = await supabase.auth.updateUser({
    email: "new@email.com",
    password: "new-password",
    data: { hello: 'world' }
  })
  
if(error){console.log(error);
  throw new Error("an error occured while signing in user")} 
return data;
}

export async function authGetUser(){
  const { data, error } = await supabase.auth.getSession();
  const user = data?.session?.user;
  if (error) throw new Error(error.message);
  
  if (!user) {
    return { user: null, profile: null };
  }
  // Fetch the profile data for the authenticated user
  const { data: profileData, error: profileError } = await supabase
    .from('Profile')
    .select('*')
    .eq('user_id', user.id)
    .single();

    if (profileError) {
      throw new Error(profileError.message);
    }
  
    return { user, profile: profileData };

}