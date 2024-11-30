// hooks/useUser.ts
import { authGetUser } from '@/services/apiAuthentication';
import { supabase } from '@/services/SupabaseConfig';
import { useQuery, UseQueryResult } from '@tanstack/react-query';


interface User {
  id: string;
  email: string;
  [key: string]: any;
}

export const useUser = (): UseQueryResult<User | null, Error> => {
  return useQuery({
    queryKey: ['user'],
    queryFn: authGetUser,
    staleTime: 1000 * 60 * 5,// cache data for 5 minutes
    retry: false,
  });
};
