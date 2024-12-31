import { useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from "react";
import "./ShowData.css";

const ShowData = () => {
  const location = useLocation();
  const { movie } = location.state || {}; // Access the movie from state
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const movieResponse = await axios.get(`https://localhost:7169/api/shows/${movie.id}/episodes`);
        setEpisodes(movieResponse.data);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };
  
    fetchEpisodes();
  }, [movie]);
  

  if (!movie) {
    return <p>Movie details not available</p>;
  }



  return (
    <div className="show-data-page">
      {/* Show Banner */}
      <div className="show-banner">
        <img src={movie.image} alt={movie.name} />
        <div className="show-info">
          <h1>{movie.name}</h1>
          <p><strong>Premiere:</strong> {movie.premiered}</p>
          <p><strong>Rating:</strong> {movie.rating?.average || "N/A"}</p>
          <p><strong>Genres:</strong> {movie.genres.join(", ")}</p>
          <p>{movie.summary?.replace(/<[^>]+>/g, "")}</p>
        </div>
      </div>

      {/* Episodes Table */}
      <div className="episodes-section">
        <h2>Episodes</h2>
        <table>
          <thead>
            <tr>
              <th>Season</th>
              <th>Episode</th>
              <th>Title</th>
              <th>Rating</th>
              <th>Summary</th>
            </tr>
          </thead>
          <tbody>
            {episodes.map(ep => (
              <tr key={ep.id}>
                <td>{ep.season}</td>
                <td>{ep.number}</td>
                <td>{ep.name}</td>
                <td>{ep.rating?.average}</td>
                <td>{ep.summary?.replace(/<[^>]+>/g, "") || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

};

export default ShowData;

