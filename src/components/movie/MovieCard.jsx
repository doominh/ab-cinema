import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Button from "@/components/button/Button";
import { withErrorBoundary } from 'react-error-boundary'
import LoadingSkeleton from "@/components/loading/LoadingSkeleton";
import { tmdbAPI } from "@/config";

const MovieCard = ({ item }) => {
  const navigate = useNavigate()
  const {
    name,
    year,
    poster_url,
    slug,
  } = item
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <img
        src={tmdbAPI.image(poster_url)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-white text-xl font-bold mb-3">{name}</h3>
        <div className="flex items-center justify-start text-sm opacity-50 mb-10">
          <span>{year}</span>
        </div>
        <Button onClick={() => navigate(`/movies/${slug}`)} bgColor="secondary" full >Watch now</Button>
      </div>
    </div>
  );
};

MovieCard.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    year: PropTypes.number,
    poster_url: PropTypes.string,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

function FallbackComponent() {
  return (
    <div className="bg-red-50 text-red-400 p-4 rounded">
      <p>Something went wrong with this component.</p>
    </div>
  );
}

export default withErrorBoundary(MovieCard, {
  FallbackComponent
});

export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <LoadingSkeleton width="100%" height="250px" radius="8px" className="mb-5"></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="text-white text-xl font-bold mb-3">
          <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span><LoadingSkeleton width="50px" height="10px"></LoadingSkeleton></span>
        </div>
        <LoadingSkeleton width="100%" height="45px" radius="6px"></LoadingSkeleton>
      </div>
    </div>
  )
}
