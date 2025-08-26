import { Fragment, lazy, Suspense } from "react"
import "swiper/scss";
import { Route, Routes } from "react-router-dom";
import Main from "@/pages/Main";

const HomePage = lazy(() => import("@/pages/HomePage"));
const MoviePage = lazy(() => import("@/pages/MoviePage"));
const MoviePageCategory = lazy(() => import("@/pages/MoviePageCategory"));
const MovieDetailPage = lazy(() => import("@/pages/MovieDetailPage"));
const NotFound404Page = lazy(() => import("@/pages/NotFound404Page"));

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route path="/" element={
              <HomePage></HomePage>
            }></Route>
            <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
            <Route path="/movies/categorySlug/:slug/categoryName/:name" element={<MoviePageCategory></MoviePageCategory>}></Route>
            <Route path="/movies/:movieId" element={<MovieDetailPage></MovieDetailPage>}></Route>
          </Route>
          <Route path="*" element={<NotFound404Page></NotFound404Page>}></Route>
        </Routes>
      </Suspense>
    </Fragment>
  )
}

export default App;
