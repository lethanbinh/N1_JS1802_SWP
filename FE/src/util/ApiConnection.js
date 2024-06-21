const fetchData = async (url, method = 'GET', body = null, token = null, contentType = 'application/json') => {
    try {
        const headers = {};

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const options = {
            method,
            headers,
        };

        if (body) {
            if (contentType === 'multipart/form-data') {
                options.body = body; // FormData object
                // Do not set Content-Type header, browser will set it automatically
            } else {
                headers['Content-Type'] = contentType;
                options.body = JSON.stringify(body);
            }
        }

        console.log(options);
        const response = await fetch(url, options);

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
        return error;
    }
};

export default fetchData;
