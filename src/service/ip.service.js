
const API_URL = 'https://geolocation-db.com/json/'

export const getIPv4 = async () => { 

    const response = await fetch(API_URL);
    const data = await response.json();
    return data.IPv4
}
