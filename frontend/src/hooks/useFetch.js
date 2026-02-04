/**
 * useFetch Hook
 * Custom hook for handling API data fetching with loading and error states
 */
import { useCallback, useEffect, useState } from 'react';

/**
 * Custom hook for fetching data from API
 * @param {Function} fetchFunction - Async function that returns data
 * @param {Array} dependencies - Dependencies for useEffect
 * @returns {Object} {data, loading, error}
 */
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const memoizedFetchFunction = useCallback(fetchFunction, [fetchFunction]);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('🎣 useFetch: Starting fetch...');
        
        const result = await memoizedFetchFunction();
        console.log('🎣 useFetch: Got result:', result);
        
        if (isMounted) {
          if (result && result.success) {
            console.log('🎣 useFetch: Setting data:', result.data);
            setData(result.data || null);
          } else {
            console.log('🎣 useFetch: Setting error:', result?.error);
            setError(result?.error || 'Failed to fetch data');
          }
        }
      } catch (err) {
        console.error('🎣 useFetch: Error caught:', err);
        if (isMounted) {
          setError(err.message || 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [memoizedFetchFunction]);

  return { data, loading, error };
};
