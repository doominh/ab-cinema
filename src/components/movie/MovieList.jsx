import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard, { MovieCardSkeleton } from './MovieCard';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '@/config';
import PropTypes from 'prop-types';
const MovieList = ({ type, cate }) => {
    const { data, error } = useSWR(cate ? tmdbAPI.getMovieCate(cate) : tmdbAPI.getMovieType(type), fetcher);
    const isLoading = !data && !error;
    if (!data) return null;
    const movies = data.data?.items || [];
    return (
        <div className="movie-list">
            {isLoading && (
                <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"}>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <SwiperSlide key={index}>
                            <MovieCardSkeleton />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
            {!isLoading && (
                <Swiper grabCursor={true} spaceBetween={40} slidesPerView={"auto"} >
                    {movies.length > 0 && movies.map(item => (
                        <SwiperSlide key={item._id}>
                            <MovieCard item={item}></MovieCard>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    )
}

MovieList.propTypes = {
    type: PropTypes.string,
    cate: PropTypes.string,
}

export default MovieList
