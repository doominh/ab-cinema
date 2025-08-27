import useSWRInfinite from "swr/infinite";
import { fetcher, tmdbAPI } from "@/config";
import MovieCard, { MovieCardSkeleton } from "@/components/movie/MovieCard";
import { useEffect, useState } from "react";
import Button from "@/components/button/Button";
import ScrollToTopButton from "@/components/button/ScrollToTopButton";
import useDebounce from "@/hooks/useDebounce";
import { v4 } from "uuid";
import { useParams } from "react-router-dom";

const itemsPerPage = 20;

const MoviePageCategory = () => {
    const { slug: categorySlug, name: categoryName } = useParams();

    const [filter, setFilter] = useState("");
    const filterDebounce = useDebounce(filter);

    const [url, setUrl] = useState(tmdbAPI.getMovieCate(categorySlug, 1, itemsPerPage));

    const handleFilterChange = (e) => setFilter(e.target.value);

    const { data, error, size, setSize, isLoading } = useSWRInfinite(
        (index) => url.replace("page=1", `page=${index + 1}`),
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
            setUrl(tmdbAPI.getMovieSearch(filterDebounce, categorySlug, itemsPerPage));
        } else {
            setUrl(tmdbAPI.getMovieCate(categorySlug, 1, itemsPerPage));
        }
    }, [filterDebounce, categorySlug]);

    return (
        <div className="page-container">
            {/* Tiêu đề & search */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-white mb-4">
                    Danh sách {categoryName}
                </h1>
                <input
                    type="text"
                    className="w-full p-4 bg-slate-800 outline-none text-white rounded-md"
                    placeholder={`Tìm kiếm phim trong ${categoryName}...`}
                    value={filter}
                    onChange={handleFilterChange}
                />
            </div>

            {/* Movie grid */}
            {loading && (
                <div className="grid gap-10 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
                    {new Array(itemsPerPage).fill(0).map(() => (
                        <MovieCardSkeleton key={v4()} />
                    ))}
                </div>
            )}

            <div className="grid xl:grid-cols-4 gap-10 md:grid-cols-3 sm:grid-cols-2">
                {!loading && movies.length > 0 && movies.map(item => (
                    <MovieCard key={item._id || item.id} item={item} />
                ))}
            </div>

            {/* Load more */}
            <div className="my-10 text-center">
                <Button
                    onClick={() => (isReachingEnd ? {} : setSize(size + 1))}
                    disabled={isReachingEnd || isLoadingMore}
                    className={`w-32 ${isReachingEnd ? "bg-slate-400" : ""}`}
                >
                    {isLoadingMore
                        ? <div className="w-6 h-6 rounded-full border-4 border-white border-t-transparent border-t-4 mx-auto animate-spin"></div>
                        : isReachingEnd
                            ? "No more movies"
                            : "Load more"}
                </Button>
            </div>

            <ScrollToTopButton />
        </div>
    );
};

export default MoviePageCategory;
