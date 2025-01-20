import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApiState, gaurdianAPI, newsAPI, nytAPI } from '../redux/apiSlice';
import { AppDispatch, RootState } from '../redux/store';
import newsAPIImage from '../assets/news.jpg';
import guardianImage from '../assets/guardian.jpg';
import nytImage from '../assets/nyt.jpg';
import SourceItem from '../components/SorceItem';
import CustomCarousel from '../components/Carousel';

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

    const SourceCards = [
        { id: "1", name: 'NewsAPI', data: 'Dive into the world’s most trusted news platforms.', image: newsAPIImage, path: '/news-api' },
        { id: "2", name: 'NewYork Times', data: 'Your gateway to stories that shape the world', image: nytImage, path: '/nyt-news' },
        { id: "3", name: 'The Guardian', data: 'View the world through The Guardian’s perspective', image: guardianImage, path: '/guardian-news' },
    ]

    if (loading) return <div className='h-[100vh] w-full grid place-items-center'> <span className="loading loading-ring loading-lg"></span></div>;
    // if (error) return <p>Error: {error}</p>;
    console.log({ newsData, error, gaurdianData, nytData, loading });
    return (
        <section>
            <CustomCarousel SourceCards={SourceCards} />
            <div className=' flex flex-wrap justify-evenly items-center gap-8 mt-10 p-8'>
                {SourceCards?.map(({ name, data, image, path }) => (<SourceItem name={name} description={data} url={image} path={path} />))}

            </div>
        </section>
    );
};

export default HomePage;