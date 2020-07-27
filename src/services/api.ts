export const apiUrl = (route: string, params?: { [key: string]: string} ) => {
    const baseUrl = `${process.env.REACT_APP_API_URL}/${route}?api_key=${process.env.REACT_APP_API_KEY}`;
    if (!params) {
        return baseUrl;
    }
    const paramsArray = Object.keys(params).map(paramKey => {
        return `${paramKey}=${params[paramKey]}`;
    })
    const paramsString = paramsArray.join('&');
    
    return `${baseUrl}&${paramsString}`;
}