import React from "react";
import { Routes, Route } from "react-router-dom";
import ListView from "./components/ListView";
import { useNavigate } from "react-router-dom";

const App: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[90%] mx-auto max-w-[1080px] my-4">
      <h1 className="text-4xl text-blue-400 text-center my-5">
        TMDB TOP 250 MOVIES LIST
      </h1>

      <div className="flex justify-center gap-5 mt-10">
        <button
          onClick={() => {
            navigate("/");
          }}
          className="bg-blue-400 text-white px-3 py-2 rounded-md"
        >
          Search
        </button>

        <button
          onClick={() => {
            navigate("/gallary");
          }}
          className="bg-blue-400 text-white px-3 py-2 rounded-md"
        >
          Gallary
        </button>
      </div>
      <Routes>
        <Route path="/" element={<ListView />} />
      </Routes>
    </div>
  );
};

export default App;
