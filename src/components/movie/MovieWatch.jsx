import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from "prop-types";
import { useState } from "react";

const MovieWatch = ({ episodes }) => {
    const [currentVideo, setCurrentVideo] = useState(episodes[0].link_embed);
    const [activeEpi, setActiveEpi] = useState(episodes[0].slug);
    const handleVideoChange = (link, slug) => {
        setCurrentVideo(link);
        setActiveEpi(slug);
    };
    return (
        <>
            <div className="w-[calc(100% + 40px)] -mx-5 pb-[86.25%]  sm:pb-[66.25%] sm:w-full sm:m-0 lg:pb-[56.25%] sm:rounded-md relative mb-6">
                <iframe
                    key={currentVideo}
                    title="Video Player"
                    src={currentVideo}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full sm:rounded-md"
                />
            </div>
            <div className="episode-list border-b border-gray-200 pb-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Các tập phim
                </h3>
                <Swiper
                    grabCursor="true"
                    spaceBetween={10}
                    slidesPerView={"auto"}
                >
                    {episodes.length > 0 && episodes.map(item => (
                        <SwiperSlide key={item.slug}>
                            <span
                                className={`block py-2 px-4 rounded-full border-2 cursor-pointer border-primaryPurple text-primaryPurple text-lg font-semibold transition-all ${activeEpi === item.slug ? 'bg-primaryPurple text-white' : ''}`}
                                onClick={() => handleVideoChange(item.link_embed, item.slug)}
                            >{item.name}</span>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
};
MovieWatch.propTypes = {
    episodes: PropTypes.array,
};
export default MovieWatch;
