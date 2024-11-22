export const fetcher = (...args) => fetch(...args).then(res => res.json());
// const tmdbEndpointSearch = "https://api.themoviedb.org/3/search/movie";
export const tmdbAPI = {
    getMovieBanner: (type, page = 1) => `https://phimapi.com/danh-sach/${type}?page=${page}`,
    getMovieDetail: (movieId) => `https://phimapi.com/phim/${movieId}`,
    getMovieCate: (cate, page = 1, limit = 20) => `https://phimapi.com/v1/api/the-loai/${cate}?page=${page}&limit=${limit}`,
    getMovieType: (type, page = 1, limit = 20) => `https://phimapi.com/v1/api/danh-sach/${type}?page=${page}&limit=${limit}`,
    image: (path) => `https://phimimg.com/${path}`,
    getMovieSearch: (query, limit = 20) => `https://phimapi.com/v1/api/tim-kiem?keyword=${query}&page=1&limit=${limit}`,
}
