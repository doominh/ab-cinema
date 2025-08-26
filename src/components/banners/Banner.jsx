import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../config';
import PropTypes from 'prop-types';
import { Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { useState } from 'react';

const Banner = () => {
    const { data } = useSWR(tmdbAPI.getMovieBanner("phim-moi-cap-nhat"), fetcher);
    const movies = data?.items || [];
    const [activeIndex, setActiveIndex] = useState(0);
    const currentMovie = movies[activeIndex];
    const { data: detail } = useSWR(
        currentMovie ? `https://phimapi.com/phim/${currentMovie.slug}` : null,
        fetcher
    );
    return (
        <section className="banner h-[350px] md:h-[500px] page-container mb-20">
            <Swiper
                grabCursor="true"
                slidesPerView={"auto"}
                modules={[Autoplay]}
                autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            >
                {movies.length > 0 && movies.map((item, index) => (
                    <SwiperSlide key={item._id}>
                        <BannerItem
                            item={item}
                            detail={index === activeIndex ? detail : null}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

const BannerItem = ({ item, detail }) => {
    const navigate = useNavigate()
    const {
        name,
        thumb_url,
        slug,
    } = item;
    const categories = detail?.movie?.category || [];
    return <div className="w-full h-full rounded-lg relative">
        <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-[rgba(0,0,0,0)] rounded-lg"></div>
        <img
            src={thumb_url}
            alt=""
            className="w-full h-full object-contain rounded-lg"
        />
        <div className="absolute left-5 bottom-5 w-full text-white">
            <h2 className="font-bold text-3xl mb-5">{name}</h2>
            <div className="flex items-center gap-x-3 mb-8">
                {categories.length > 0 ? (
                    categories.map((c) => (
                        <span
                            key={c.id || c.name}
                            className="py-2 px-4 border border-white rounded-md hover:bg-primary transition-all cursor-pointer"
                            onClick={() => navigate(`/movies/categorySlug/${c.slug}/categoryName/${c.name}`)}
                        >
                            {c.name}
                        </span>
                    ))
                ) : (
                    <div className="w-6 h-6 rounded-full border-4 border-white border-t-transparent border-t-4 mx-left animate-spin"></div>
                )}
            </div>
            <Button onClick={() => navigate(`/movies/${slug}`)} bgColor='secondary'>
                <div className='flex items-center gap-2'>
                    <span>
                        Watch now
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clipRule="evenodd" />
                    </svg>
                </div>

            </Button>
        </div>
    </div>
}

BannerItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        thumb_url: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
    }).isRequired,
    detail: PropTypes.object,
};

export default Banner
