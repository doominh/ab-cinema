import { Fragment } from "react"
import MovieList from "@/components/movie/MovieList"
import ScrollToTopButton from "@/components/button/ScrollToTopButton"
import Banner from "@/components/banners/Banner"

const HomePage = () => {
  return (
    <Fragment>
      <Banner></Banner>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">Phim lẻ</h2>
        <MovieList type="phim-le"></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">Phim bộ</h2>
        <MovieList type="phim-bo"></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">Hoạt hình</h2>
        <MovieList type="hoat-hinh"></MovieList>
      </section>
      <section className="movies-layout page-container pb-20">
        <h2 className="capitalize text-white mb-10 text-3xl font-bold">Chương trình truyền hình</h2>
        <MovieList type="tv-shows"></MovieList>
      </section>
      <ScrollToTopButton></ScrollToTopButton>
    </Fragment>
  )
}

export default HomePage
