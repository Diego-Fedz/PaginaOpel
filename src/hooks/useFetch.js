import { useState, useEffect } from 'react';

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [url]);
    return { data, loading, error };
}

export default useFetch;