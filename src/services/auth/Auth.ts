import { createCookie, storeData } from "@/lib/createCookie";

export const LoginAuth = (data): Promise<null | any> => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data), // 👈 Send raw data, not wrapped in { data }
                });

                if (!response) {
                    throw new Error('Login failed');
                }

                const result = await response.json();
                console.log('Login successful:', result);
                resolve(result)

                // Handle success (e.g., redirect, store token, etc.)
            } catch (error: any) {
                console.error('Error:', error.message);
                reject(null)
            }

        } catch (err) {
            console.error('Error:', err.message);
            reject(null)
        }
    })
}

export const SignUpAuth = (data): Promise<null | any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    reject(401);
                } else {
                    throw new Error('Signup failed');
                }
            } else {
                const result = await response.json();
                console.log('Signup successful:', result);
                resolve(result)
                // Optionally reset form
            }
        } catch (error: any) {
            console.error('Error:', error.message);
            reject(error.message);
        }
    })
}