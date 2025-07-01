import { BusinessType } from '@/types/businesses';
import Cookies from 'js-cookie'

export const createCookie = async (token: string) => {
  // console.log('token created: ', token)
  // Set token cookie without expiry
  Cookies.set('userToken', token, {
    secure: true,
    sameSite: 'Strict',
    expires: 7 // days
  });
};

export const firstTimeVisitToken = () => {
  console.log('set the firsttime token')

  Cookies.set('didVisit', 'user did visit', {
    secure: true,
    sameSite: 'Strict'
  });
}

export const getFirstTimeVisitToken = () => {
  let firstTimeToken = Cookies.get('didVisit')

  if (firstTimeToken) {
    return firstTimeToken
  }
  return null;
}
// For getting token from the cookies
export const getCookie = () => {
  let Token = Cookies.get('userToken');

  // console.log("token here: ", Token);
  // If Token exists in the cookies, check with server if it's valid or expired
  if (Token) {
    return Token;
  }
  return null; // Token does not exist in cookies
};

export const removeToken = () => {
  // Remove the token 
  Cookies.remove('userToken');
  // and user  data
}



export const storeData = (data: any) => {
  try {
    localStorage.setItem('userData', JSON.stringify(data));
    console.log("User data stored successfully");
  } catch (error) {
    console.error("Failed to store data:", error);
  }
}


export const storeOrgData = (data: BusinessType) => {
  try {
    // Convert the array to a JSON string and store in cookies
    Cookies.set('BusinessID', JSON.stringify(data), { expires: 7, path: '/' }); // Expires in 7 days
    console.log("BusinessID array stored successfully in cookies");
  } catch (error) {
    console.error("Failed to store BusinessID array in cookies:", error);
  }
};

export const getOrgData = (): BusinessType | null => {
  try {
    const data = Cookies.get('BusinessID');
    console.log(data)
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to retrieve BusinessID array from cookies:", error);
    return null;
  }
};

export const removeOrgData = (): void => {
  try {
    Cookies.remove('BusinessID');
    console.log("BusinessID cookie has been removed.");
  } catch (error) {
    console.error("Failed to remove BusinessID cookie:", error);
  }
};

export const removeData = (): Promise<boolean | null> => {
  return new Promise((resolve, reject) => {
    try {
      localStorage.removeItem('userData');
      removeToken();
      removeOrgData()
      console.log("User data removed successfully");
      resolve(true)
    } catch (error) {
      if (error instanceof Error) {
        console.error("Failed to remove data:", error.message);
        resolve(true)
      } else {
        console.error("An unknown error occurred while removing data.");
        resolve(null)
      }
    }
  })

};

export const getData = (): any => {
  try {
    const data = localStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Failed to retrieve data:", error);
    return null;
  }
};