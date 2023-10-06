import 'whatwg-fetch';
import errorHandler from '@/helpers/errorHandler';

async function handleResponse(response) {
    try {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            return await response.text();
        }
    } catch (error) {
        errorHandler(error, 'handleResponse');
        throw error;
    }
}
  
export async function handleRequest(methodType, url, data = null) {
    const requestOptions = {
        method: methodType,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'omit',
        headers: {
            'Content-Type': 'application/json',
        },
    };
  
    if (data) {
        requestOptions.body = JSON.stringify(data);
    }
  
    try {
        const response = await fetch(url, requestOptions);
        return handleResponse(response);
    } catch (error) {
        errorHandler(error, 'handleRequest');
    }
}
