const fetchData = async (url, method = 'GET', body = null, token = null) => {
    try {
        const headers = {
            'Content-Type': 'application/json',
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

        const response = await fetch(url, options);

        const data = await response.json();
        return data;
    } catch (error) {
        return error;
    }
};

export default fetchData;
