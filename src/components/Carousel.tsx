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

                        <div className="md:w-1/2 h-[400px] mx-auto ">
                            <h1 className="banner-main-heading md:text-4xl">
                                {SourceCards[0].name}
                            </h1>
                            <h5 className="text-brandPrimary text-base mb-8">
                                {SourceCards[0].data}
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

                        <div className="md:w-1/2 h-[400px] mx-auto ">
                            <h1 className="banner-main-heading md:text-4xl">
                                {SourceCards[1].name}
                            </h1>
                            <h5 className="text-brandPrimary text-base mb-8">
                                {SourceCards[1].data}
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

                        <div className="md:w-1/2 h-[400px] mx-auto text-textColor ">
                            <h1 className="banner-main-heading text-textColor md:text-4xl">
                                {SourceCards[2].name}
                            </h1>
                            <h5 className="text-black text-base mb-8">
                                {SourceCards[2].data}
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