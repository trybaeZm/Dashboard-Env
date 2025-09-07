export const LoginAuth = (data:any): Promise<null | any> => {
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

                if(response.status == 401){
                    reject(result)
                }

                console.log('Login successful:', result);
                resolve(result)

                // Handle success (e.g., redirect, store token, etc.)
            } catch (error: any) {
                console.error('Error:', error.message);
                reject(null)
            }

        } catch (err) {
            if (err instanceof Error) {
                console.error('Error:', err.message);
            } else {
                console.error('Error:', err);
            }
            reject(null)
        }
    })
}

export const SignUpAuth = (data:any): Promise<null | any> => {
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