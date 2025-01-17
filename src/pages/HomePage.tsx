import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApiState, gaurdianAPI, newsAPI, nytAPI } from '../redux/apiSlice';
import { AppDispatch, RootState } from '../redux/store';

const HomePage = () => {
    const dispatch: AppDispatch = useDispatch();
    const { newsAPI: newsData, gaurdianAPI: gaurdianData, nytAPI: nytData, loading, error } =
        useSelector((state: RootState) => state?.data as ApiState);

    useEffect(() => {
        // Dispatch thunks to fetch data
        dispatch(newsAPI());
        dispatch(gaurdianAPI());
        dispatch(nytAPI());
    }, [dispatch]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    console.log({ newsData, error, gaurdianData, nytData, loading });
    return (
        <div className='bg-slate-500'>
            <h1 className='text-red-950 font-extrabold'>Home Page</h1>
            <p>Welcome to the Home Page!</p>
            <h1>NewsAPI Data</h1>
            {/* {newsData && <pre>{JSON.stringify(newsData, null, 2)}</pre>} */}

            <h1>Guardian API Data</h1>
            {gaurdianData && <pre>{JSON.stringify(gaurdianData, null, 2)}</pre>}

            {/* <h1>New York Times API Data</h1>
            {nytData && <pre>{JSON.stringify(nytData, null, 2)}</pre>} */}
        </div>
    );
};

export default HomePage;