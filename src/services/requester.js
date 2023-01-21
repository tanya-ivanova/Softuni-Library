const request = async (method, url, data) => {
    try {
        const user = localStorage.getItem('auth');
        const auth = JSON.parse(user || '{}');        

        let headers = {};

        if(auth.accessToken) {
            headers['X-Authorization'] = auth.accessToken;        
        }

        let buildRequest;

        if(method === 'GET') {
            buildRequest = fetch(url, {headers});
        } else {
            buildRequest = fetch(url, {
                method,
                headers: {
                    ...headers,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        }

        const response = await buildRequest;

        if (response.ok === false) {

            if (response.status === 403) {
                localStorage.removeItem('auth');;
            }

            const error = await response.json();
            throw new Error(error.message);
        }

        if (response.status === 204) {
            return response;
        } else {
            const result = await response.json();
            return result;            
        }
        

    } catch (err) {
        alert(err.message);
        throw err;
    }
};

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const patch = request.bind(null, 'PATCH');
export const del = request.bind(null, 'DELETE');


