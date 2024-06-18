const fetchData = async (url, method = 'GET', body = null, token = null, contentType = 'application/json') => {
    try {
        const headers = {
            'Content-Type': contentType,
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const options = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }
        console.log(options)
        const response = await fetch(url, options);

        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
};

export default fetchData;
