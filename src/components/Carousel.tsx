import React from 'react';
import { Carousel } from "flowbite-react";
import { Link } from 'react-router';


interface SourceCardProps {
    name: string;
    data: string;
    image: string;
    path: string;
    id: string;
}

interface CustomCarouselProps {
    SourceCards: SourceCardProps[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({ SourceCards }) => {

    return (
        <div className="rounded-xl" id="home" data-testid="home">
            <div className="px-4 lg:px-14 max-w-screen-2xl mx-auto h-[500px] flex justify-center items-center rounded-xl">
                <Carousel className="w-full h-full rounded-xl ">
                    <div className={`banner-main-section bg-my-image-class1`} key={SourceCards[0].id}>
                        <div>
                            <img src={SourceCards[0].image} alt={SourceCards[0].name} className=" hidden" />
                        </div>

                        <div className="md:w-1/2 h-[400px] mx-auto  text-neonCyan text-shadow-neon bg-slate-950 bg-opacity-30 rounded px-4 ">
                            <h1 className="banner-main-heading md:text-4xl">
                                {SourceCards[0].name}
                            </h1>
                            <h5 className="text-brandPrimary text-base mb-8 font-extrabold">
                                Explore the latest headlines and breaking news from around the globe with NewsAPI. Offering access to a vast array of sources, NewsAPI ensures you stay informed about events and stories from diverse perspectives. Whether you're interested in politics, technology, sports, or entertainment, this platform brings you reliable, up-to-date news at your fingertips.

                            </h5>

                            <Link to={SourceCards[0].path} >
                                <button className="btn btn-info">Read More</button>
                            </Link>
                        </div>
                    </div>
                    <div className={`banner-main-section bg-my-image-class2`} key={SourceCards[1].id}>
                        <div>
                            <img src={SourceCards[1].image} alt={SourceCards[1].name} className=" hidden" />
                        </div>

                        <div className="md:w-1/2 h-[400px] mx-auto  text-neonCyan text-shadow-neon  bg-slate-950 bg-opacity-30 rounded px-4 ">
                            <h1 className="banner-main-heading md:text-4xl">
                                {SourceCards[1].name}
                            </h1>
                            <h5 className="text-brandPrimary text-base mb-8 font-extrabold">
                                Step into the world of award-winning journalism with The New York Times. From in-depth analyses and investigative reports to the latest news updates, The Times covers a broad spectrum of topics, including international affairs, business, culture, and science. Renowned for its journalistic excellence, it offers stories that shape public opinion and influence global conversations
                            </h5>

                            <Link to={SourceCards[1].path} >
                                <button className="btn btn-info">Read More</button>
                            </Link>
                        </div>
                    </div>
                    <div className={`banner-main-section bg-my-image-class3`} key={SourceCards[2].id}>
                        <div>
                            <img src={SourceCards[2].image} alt={SourceCards[2].name} className=" hidden" />
                        </div>

                        <div className="md:w-1/2 h-[400px] mx-auto mr-80  text-brandPrimary text-shadow-neon  bg-slate-950 bg-opacity-30 rounded px-4 ">
                            <h1 className="banner-main-heading md:text-4xl">
                                {SourceCards[2].name}
                            </h1>
                            <h5 className=" text-base mb-8 font-bold">
                                Delve into progressive and independent journalism with The Guardian. Known for its commitment to transparency and integrity, The Guardian provides comprehensive coverage of global events, social justice issues, and cultural trends. With a focus on stories that matter, The Guardian offers a unique perspective on the world, fostering informed discussions and thought-provoking insights.

                            </h5>

                            <Link to={SourceCards[2].path} >
                                <button className="btn btn-info">Read More</button>
                            </Link>
                        </div>
                    </div>

                </Carousel>
            </div>
        </div>
    );
};

export default CustomCarousel;