import React, { useState, useEffect } from "react";
import axios from "axios";

let API_URL = import.meta.env.VITE_API_URL

export default function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/movies`)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold text-center mb-8">
        Movie Collection
      </h1>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {movies.map((movie) => {
          return (
            <div
              key={movie._id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                {movie.title}
              </h2>

              <p className="text-gray-600 leading-relaxed">
                {movie.description}
              </p>
            </div>
          );
        })}

      </div>
    </div>
  );
}