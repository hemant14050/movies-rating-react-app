import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {config} from "../../config";
const {API_KEY} = config;
let API_URL: string;
import Loader from "./Loader";

const ListView: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  interface Movie {
    id: number;
    title: string;
    vote_average: number;
    poster_path: string;
  }

  const [sortBy, setSortBy] = useState<string>("title");
  const [listOrder, setListOrder] = useState<string>("ascending");
  const [apiResults, setApiResults] = useState<Movie[]>([]);
  const [filteredApiResults, setFilteredApiResults] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    fetchMoviesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, page]);

  const fetchMoviesData = async () => {
    try {
      if(searchText !== "") {
        API_URL = `https://api.themoviedb.org/3/search/movie?query=${searchText}&api_key=${API_KEY}&language=en-US&page=${page}`;
      } else {
        API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
      }
      const response = await axios.get(API_URL);
      setApiResults(response.data.results);
    } catch (err) {
      console.log("ERROR WHILE CALLING API ============", err);
    }
  };

  useEffect(() => {
    filterResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiResults, sortBy, listOrder]);

  const filterResults = () => {
    const filteredResults = [...apiResults];
    if (sortBy === "title") {
      filteredResults.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        } else {
          return 1;
        }
      });
    } else if (sortBy === "rating") {
      filteredResults.sort((a, b) => {
        if (a.vote_average < b.vote_average) {
          return -1;
        } else {
          return 1;
        }
      });
    }

    if (listOrder === "descending") {
      filteredResults.reverse();
    }

    setFilteredApiResults(filteredResults);
    // console.log("Filtered results: ", results);
  };

  return (
    <div className="max-w-[600px] mx-auto space-y-4">
      <div className="bg-blue-200 p-4 mx-auto mt-6 rounded-md">
        <input
          type="text"
          placeholder="Search for movies"
          className="w-full px-3 py-2 rounded-md outline-none"
          onChange={(e) => {
            setSearchText(e.target.value);
            setPage(1);
          }}
          value={searchText}
        />

        <div className="mt-2">
          <label htmlFor="sort-by">Sort By</label>
          <select
            name="sort-by"
            id="sort-by"
            className="w-full px-3 py-2 rounded-md outline-none mt-1"
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
            value={sortBy}
          >
            <option value="title">Title</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div className="mt-2">
          <div className="flex gap-5">
            <div>
              <input
                type="radio"
                id="ascending"
                name="list-order"
                value="ascending"
                checked={listOrder === "ascending"}
                onChange={(e) => {
                  setListOrder(e.target.value);
                }}
              />
              <label htmlFor="ascending"> Ascending</label>
            </div>
            <div>
              <input
                type="radio"
                id="descending"
                name="list-order"
                value="descending"
                checked={listOrder === "descending"}
                onChange={(e) => {
                  setListOrder(e.target.value);
                }}
              />
              <label htmlFor="descending"> Descending</label>
            </div>
          </div>
        </div>
      </div>

      <div className="border-[1px] rounded-md border-blue-300 p-3">
        <ul className="space-y-3">
          {
            filteredApiResults.length === 0 && searchText !== "" && (
              <li className="text-center text-lg text-red-500">
                No results found
              </li>
            )
          }
          {
            filteredApiResults.length === 0 && searchText === "" && (
              <Loader />
            )
          }
          {filteredApiResults.map((movie) => {
            return (
              <li
                key={movie.id}
                className="flex gap-3 items-center bg-slate-200 p-2 rounded-md cursor-pointer hover:scale-110 transition-all duration-200"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt=""
                  className="w-20 h-25 rounded-md object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm">
                    <span className="text-blue-600">Rating:</span>{" "}
                    {movie.vote_average}
                  </p>
                </div>
              </li>
            );
          })}
          {
            filteredApiResults.length > 0 && (
              <div className="flex justify-between">
                {
                  page > 1 && (
                    <button
                      className="bg-blue-200 p-2 rounded-md mr-auto"
                      onClick={() => {
                        setPage(page - 1);
                      }}
                    >
                      Previous
                    </button>
                  )
                }

                <button
                  className="bg-blue-200 p-2 rounded-md ml-auto"
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  Next
                </button>
              </div>
            )
          }
        </ul>
      </div>
    </div>
  );
};

export default ListView;
