import Cookies from 'js-cookie'

export const createCookie = async (token: string) => {
    console.log('token created: ', token)
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