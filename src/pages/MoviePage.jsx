import useSWRInfinite from "swr/infinite";
import { fetcher, tmdbAPI } from "@/config";
import MovieCard, { MovieCardSkeleton } from "@/components/movie/MovieCard";
import { useEffect, useState } from "react";
import Button from "@/components/button/Button";
import ScrollToTopButton from "@/components/button/ScrollToTopButton";
import useDebounce from "@/hooks/useDebounce";
import { v4 } from "uuid"
import Spin from "@/components/loading/Spin";

const itemsPerPage = 20;
const MoviePage = () => {
    const [filter, setFilter] = useState("");
    const filterDebounce = useDebounce(filter);
    const [url, setUrl] = useState(tmdbAPI.getMovieType("phim-le"));
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    }
    const {
        data,
        error,
        size,
        setSize,
        isLoading,
    } = useSWRInfinite(
        (index) =>
            url.replace("page=1", `page=${index + 1}`),
        fetcher
    );

    const movies = data
        ? data.reduce((a, b) => a.concat(b.data.items || []), [])
        : [];
    const isLoadingMore =
        isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");
    const loading = !error && !data;
    const isEmpty = !data?.[0]?.data?.items || data[0].data.items.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.data.items.length < itemsPerPage);
    useEffect(() => {
        if (filterDebounce) {
            setUrl(tmdbAPI.getMovieSearch(filterDebounce, '', itemsPerPage));
        } else {
            setUrl(tmdbAPI.getMovieType("phim-le"));
        };
    }, [filterDebounce])
    return (
        <div className="page-container">
            <div className="flex mb-10">
                <div className="flex-1">
                    <input
                        type="text"
                        className="w-full p-4 bg-slate-800 outline-none text-white rounded-l-md"
                        placeholder="Type here to search..."
                        defaultValue={filter}
                        onChange={handleFilterChange}
                    />
                </div>
            </div>
            {loading && (
                <div className="grid gap-10 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                    {loading && (
                        new Array(itemsPerPage).fill(0).map(() => (
                            <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
                        ))
                    )}
                    {!loading && movies.length > 0 && movies.map(item => (
                        <MovieCard key={item.id} item={item}></MovieCard>
                    ))}
                </div>
            )}
            <div className="grid xl:grid-cols-4 gap-10 md:grid-cols-3 sm:grid-cols-2">
                {!loading && movies.length > 0 && movies.map(item => (
                    <MovieCard key={item._id} item={item} type="phim-moi-cap-nhat"></MovieCard>
                ))}
            </div>

            {/* Load more ... */}
            <div className="my-10 text-center">
                <Button
                    onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
                    disabled={isReachingEnd || isLoadingMore}
                    className={`w-32 ${isReachingEnd ? "bg-slate-400" : ""}`}
                >{isLoadingMore
                    ? <Spin size="w-6 h-6" className="flex items-center justify-center w-full h-full"></Spin>
                    : isReachingEnd
                        ? "No more movies"
                        : "Load more"}</Button>
            </div>
            <ScrollToTopButton></ScrollToTopButton>
        </div>
    )
}

export default MoviePage
