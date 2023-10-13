import React from 'react';

interface MovieDetailViewProps {
    movie: {
        poster_path: string;
        title: string;
        overview: string;
        vote_average: number;
    };
}

const MovieDetailView: React.FC<MovieDetailViewProps> = ({ movie }) => {
  return (
    <>
        <h1>Movie Detail View</h1>
        <div className="flex gap-5">
          <div className="w-[200px] h-[300px]">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt="movie poster"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl">{movie.title}</h1>
            <p className="text-xl">{movie.overview}</p>
            <p className="text-xl">Rating: {movie.vote_average}</p>
          </div>
        </div>
    </>
  )
}

export default MovieDetailView;