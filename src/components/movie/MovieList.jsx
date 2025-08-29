import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard, { MovieCardSkeleton } from './MovieCard';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '@/config';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const MovieList = ({ type, cate }) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const uniqueId = type || cate || 'default';
  const prevClass = `swiper-button-prev-${uniqueId}`;
  const nextClass = `swiper-button-next-${uniqueId}`;

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const { data, error } = useSWR(
    cate ? tmdbAPI.getMovieCate(cate) : tmdbAPI.getMovieType(type),
    fetcher
  );
  const isLoading = !data && !error;

  if (!data) return null;
  const movies = data.data?.items || [];

  return (
    <div className="movie-list relative">
      {isLoading && (
        <Swiper grabCursor={true} spaceBetween={40} slidesPerView="auto">
          {Array.from({ length: 5 }).map((_, index) => (
            <SwiperSlide key={index}>
              <MovieCardSkeleton />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
      {!isLoading && (
        <Swiper
          modules={[Navigation]}
          grabCursor={true}
          spaceBetween={40}
          slidesPerView="auto"
          navigation={{
            prevEl: `.${prevClass}`,
            nextEl: `.${nextClass}`,
            disabledClass: 'opacity-50 pointer-events-none',
          }}
          onSlideChange={handleSlideChange}
          onInit={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
        >
          {movies.length > 0 &&
            movies.map((item) => (
              <SwiperSlide key={item._id}>
                <MovieCard item={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      )}
      <div
        className={`${prevClass} absolute top-1/2 -left-4 transform -translate-y-1/2 z-10 text-white p-2 bg-slate-800 rounded-full cursor-pointer`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>
      <div
        className={`${nextClass} absolute top-1/2 -right-4 transform -translate-y-1/2 z-10 text-white p-2 bg-slate-800 rounded-full cursor-pointer`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string,
  cate: PropTypes.string,
};

export default MovieList;