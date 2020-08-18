export const apiUrl = (route: string, params?: { [key: string]: (string | number | boolean) } ) => {
    const baseUrl = `${process.env.REACT_APP_API_URL}${route}?api_key=${process.env.REACT_APP_API_KEY}`;
    if (!params) {
        return baseUrl;
    }
    const paramsArray = Object.keys(params).map(paramKey => {
        return `${paramKey}=${params[paramKey]}`;
    })
    const paramsString = paramsArray.join('&');
    
    return `${baseUrl}&${paramsString}`;
}

export enum ApiMethods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE'
}

export const makeApiCall = async <T = any>(route: string, method: ApiMethods, params?: { [key: string]: (string | number | boolean) }, signal?: AbortSignal): Promise<T> => {
    const results = await fetch(
        apiUrl(route, params),
        {
            method: 'GET',
            signal: signal
        }
    );
    return results.json();
}