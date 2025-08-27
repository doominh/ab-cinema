import useSWR from "swr";
import { fetcher, tmdbAPI } from "@/config";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import MovieList from "@/components/movie/MovieList";
import MovieWatch from "@/components/movie/MovieWatch";

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const { data, error } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);
    const isLoading = !data && !error;
    if (!data) return null;
    const { poster_url, thumb_url, name, category, content, actor } = data.movie;
    const { server_name, server_data } = data.episodes[0];
    return (
        <div className="pb-10">
            {isLoading
                ? <>
                    <div className="w-full h-[600px] relative">
                        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                        <LoadingSkeleton width="100%" height="100%"></LoadingSkeleton>
                    </div>
                    <div className="w-full h-full max-w-[900px] mx-auto -mt-[200px] relative z-10 pb-10">
                        <LoadingSkeleton width="100%" height="400px" radius="12px"></LoadingSkeleton>
                    </div>
                    <h1 className="w-28 mx-auto mb-10">
                        <span><LoadingSkeleton width="100%" height="40px"></LoadingSkeleton></span>
                    </h1>
                    <div className="flex items-center justify-center gap-x-5 mb-10">
                        <LoadingSkeleton width="150px" height="40px" radius="9999px"></LoadingSkeleton>
                        <LoadingSkeleton width="150px" height="40px" radius="9999px"></LoadingSkeleton>
                        <LoadingSkeleton width="150px" height="40px" radius="9999px"></LoadingSkeleton>
                    </div>
                    <div className="max-w-[600px] mx-auto mb-10">
                        <LoadingSkeleton width="95%" height="10px" className="my-2 ml-auto" ></LoadingSkeleton>
                        <LoadingSkeleton width="100%" height="10px" className="my-2" ></LoadingSkeleton>
                        <LoadingSkeleton width="100%" height="10px" className="my-2" ></LoadingSkeleton>
                        <LoadingSkeleton width="100%" height="10px" className="my-2" ></LoadingSkeleton>
                        <LoadingSkeleton width="100%" height="10px" className="my-2" ></LoadingSkeleton>
                        <LoadingSkeleton width="100%" height="10px" className="my-2" ></LoadingSkeleton>
                    </div>
                    <MovieCredits isLoading={isLoading}></MovieCredits>
                </>
                : <>
                    <div className="w-full h-[600px] relative">
                        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
                        <div className="w-full h-full bg-cover bg-top bg-no-repeat" style={{
                            backgroundImage: `url(${poster_url})`
                        }} > </div>
                    </div>
                    <div className="w-full h-full max-w-[900px] mx-auto -mt-[200px] relative z-10 pb-10">
                        <img src={thumb_url || "/src/assets/default_movie_image.png"} alt="" className="w-full h-full object-cover rounded-xl" />
                    </div>
                    <h1 className="text-center text-5xl font-semibold mb-10">{name}</h1>
                    {category.length > 0 && <div className="gap-5 mb-10 flex justify-center items-center flex-wrap">
                        {category.map(item => (
                            <button key={item.id} className='py-3 px-6 rounded-full border-2 border-primaryPurple text-primaryPurple text-lg font-semibold'>{item.name}</button>
                        ))}
                    </div>}
                    <p className="text-center indent-4 leading-relaxed max-w-[600px] mx-auto mb-10">{content}</p>
                    <MovieWatch episodes={server_data} server={server_name} ></MovieWatch>
                    <MovieCredits actor={actor} isLoading={isLoading}></MovieCredits>
                    <div className="py-10">
                        {category.length > 0 && category.map(item => (
                            <section key={item.name} className="movies-layout pb-20">
                                <h2 className="capitalize text-white mb-10 text-3xl font-bold">{item.name}</h2>
                                <MovieList cate={item.slug}></MovieList>
                            </section>
                        ))}
                    </div>
                </>
            }
        </div>
    )
}

function MovieCredits({ actor, isLoading }) {
    if (!actor || actor.length <= 0) return null;
    return <div className="py-10">
        <h2 className="text-center text-4xl font-semibold mb-10">Casts</h2>
        <div className="flex items-center justify-evenly flex-wrap gap-5">
            {isLoading && (
                Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="cast-item-skeleton">
                        <h3 className="text-lg font-semibold text-center my-2">
                            <LoadingSkeleton width="100px" height="12px" className="mx-auto"></LoadingSkeleton>
                        </h3>
                    </div>
                ))
            )}
            {!isLoading && actor.slice(0, 4).map((item) => (
                <div key={item} className="cast-item bg-primaryPurple py-2 px-4 rounded-full">
                    <h3 className="text-lg font-semibold text-center">{item}</h3>
                </div>
            ))}
        </div>
    </div>
}
MovieCredits.propTypes = {
    actor: PropTypes.array,
    isLoading: PropTypes.bool,
};

export default MovieDetailPage;
