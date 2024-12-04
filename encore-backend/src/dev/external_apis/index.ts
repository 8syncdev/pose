// export const API_URL_EVAL_CODE = "http://127.0.0.1:8000"; // Local backend fastapi
export const API_URL_EVAL_CODE = "https://evaluation-code-via-syntax-python.vercel.app"; // Local backend fastapi

interface FetchOptions<TData = any> extends RequestInit {
    params?: Record<string, string>;
    data?: TData;
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// GET method
export const get = async <TResponse = any>(
    baseUrl: string,
    endpoint: string,
    token?: string,
    options: FetchOptions = {}
): Promise<TResponse> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const { params, ...restOptions } = options;
    let url = `${baseUrl}${endpoint}`;
    if (params) {
        const queryString = new URLSearchParams(params).toString();
        url = `${url}?${queryString}`;
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers,
            ...restOptions
        });
        const result = await response.json() as TResponse;

        if (!response.ok) {
            throw new Error((result as any)?.message || 'GET request failed');
        }

        return result;
    } catch (error) {
        console.error('GET request failed:', error);
        throw error;
    }
};

// POST method
export const post = async <TResponse = any, TData = any>(
    baseUrl: string,
    endpoint: string,
    data: TData,
    token?: string,
    options: FetchOptions = {}
): Promise<TResponse> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
            ...options
        });
        const result = await response.json() as TResponse;

        if (!response.ok) {
            throw new Error((result as any)?.message || 'POST request failed');
        }

        return result;
    } catch (error) {
        console.error('POST request failed:', error);
        throw error;
    }
};

// PUT method
export const put = async <TResponse = any, TData = any>(
    baseUrl: string,
    endpoint: string,
    data: TData,
    token?: string,
    options: FetchOptions = {}
): Promise<TResponse> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data),
            ...options
        });
        const result = await response.json() as TResponse;

        if (!response.ok) {
            throw new Error((result as any)?.message || 'PUT request failed');
        }

        return result;
    } catch (error) {
        console.error('PUT request failed:', error);
        throw error;
    }
};

// DELETE method
export const del = async <TResponse = any>(
    baseUrl: string,
    endpoint: string,
    token?: string,
    options: FetchOptions = {}
): Promise<TResponse> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'DELETE',
            headers,
            ...options
        });
        const result = await response.json() as TResponse;

        if (!response.ok) {
            throw new Error((result as any)?.message || 'DELETE request failed');
        }

        return result;
    } catch (error) {
        console.error('DELETE request failed:', error);
        throw error;
    }
};

// PATCH method
export const patch = async <TResponse = any, TData = any>(
    baseUrl: string,
    endpoint: string,
    data: TData,
    token?: string,
    options: FetchOptions = {}
): Promise<TResponse> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json'
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            method: 'PATCH',
            headers,
            body: JSON.stringify(data),
            ...options
        });
        const result = await response.json() as TResponse;

        if (!response.ok) {
            throw new Error((result as any)?.message || 'PATCH request failed');
        }

        return result;
    } catch (error) {
        console.error('PATCH request failed:', error);
        throw error;
    }
};
