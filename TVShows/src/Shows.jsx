
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './shows.css';

const AllMovies = () => {
  const [movies, setMovies] = useState([]); // Displayed movies
  const [originalMovies, setOriginalMovies] = useState([]); // Full list of movies
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState({ genres: [], rating: '', language: '' }); // Filters
  const [id, setId] = useState("1");
  const [theme, setTheme] = useState('light'); // Theme state
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [moviesPerPage] = useState(14); // Movies per page
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch movies from the server
    const fetchMovies = async () => {
      try {
        const movieResponse = await axios.get('https://localhost:7169/api/shows');
        setMovies(movieResponse.data);
        setOriginalMovies(movieResponse.data);
        console.log(movies)
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };


    fetchMovies();
  }, [id]);

  useEffect(() => {
    handleFilter();
  }, [filter]);


  const handleSearch = async () => {
    // Filter movies based on search input and filters
        const movieResponse = await axios.get(`https://localhost:7169/api/shows?query=${search}`);
        setMovies(movieResponse.data);
        setOriginalMovies(movieResponse.data);      
        setFilter({ genres: [], rating: '', language: '' })
        setCurrentPage(1); // Reset to first page after search
  };


  const handleFilter = () => {
    // Filter movies based on search input and filters
    const filteredMovies = originalMovies.filter(movie => {
      const matchesGenres = filter.genres.length > 0 ? filter.genres.every(genre => movie.genres.includes(genre)) : true;
      const matchesRating = filter.rating ? movie.rating >= parseFloat(filter.rating) : true;
      const matchesLanguage = filter.language ? movie.language === filter.language : true;
      return  matchesGenres && matchesRating && matchesLanguage;
    });
    setMovies(filteredMovies);
    setCurrentPage(1); // Reset to first page after search
  };


  const handleGenreChange = (genre) => {
    setFilter(prevFilter => {
      const isSelected = prevFilter.genres.includes(genre);
      const updatedGenres = isSelected
        ? prevFilter.genres.filter(g => g !== genre)
        : [...prevFilter.genres, genre];
      return { ...prevFilter, genres: updatedGenres };
    });
    handleFilter();
  };

  

  const nextPage = () => {
    if (currentPage < Math.ceil(movies.length / moviesPerPage)) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  // Pagination logic
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie);

  return (
    <div className={`all-movies ${theme}`}>
      

      <div className="filter-bar">
        {/* Search Bar */}
        <div className="filter-group">
          <input
            type="text"
            className="filter-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for a movie..."
          />
          
        </div>
        <button className="filter-button" onClick={handleSearch}>
            Search
          </button>
        {/* Genres Dropdown */}
        <div className="filter-group genres-hover">
          <label className="filter-label">Genres</label>
          <div className="genres-dropdown">
            {["Action", "Comedy", "Family", "Anime", "Drama", "Horror", "Romance", "Science-Fiction"].map((genre) => (
              <label key={genre} className="checkbox-label">
                <input
                  type="checkbox"
                  value={genre}
                  checked={filter.genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                {genre}
              </label>
            ))}
          </div>
        </div>

        {/* Rating Filter */}
        <div className="filter-group">
          <label className="filter-label">Min Rating:</label>
          <input
            type="number"
            className="filter-input"
            placeholder="e.g., 8"
            value={filter.rating}
            min="0"
            max="10"
            step="0.1"
            onChange={(e) =>
              setFilter({ ...filter, rating: e.target.value })
            }
          />
        </div>

        {/* Language Filter */}
        <div className="filter-group">
          <label className="filter-label">Language:</label>
          <select
            className="filter-select"
            value={filter.language}
            onChange={(e) =>
              setFilter({ ...filter, language: e.target.value })
            }
          >
            <option value="">All Languages</option>
            <option value="English">English</option>
            <option value="Japanese">Japanese</option>
            <option value="Spanish">Spanish</option>
            <option value="Italian">Italian</option>
          </select>
        </div>
      </div>



      <div className="movies-grid">
        {currentMovies.map(movie => (
            <div className="movie-card" key={movie._id}>
            <h3>{movie.name}</h3>
            {movie.image && <img src={movie.image} alt={movie.name} className="movie-image" />}
            <p>Premiered: {movie.premiered}</p>
            <p>Genres: {movie.genres.join(', ')}</p>
            <p>Rating: {movie.rating || 'N/A'}</p>
            <p>Language: {movie.language || 'N/A'}</p>
            
           
            <div className="buttons">
            <button onClick={() => navigate(`/show-data/${movie.id}`, { state: { movie } })}>Watch</button>
            </div>
            </div>
          ))}
      </div>


      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Back</button>
        <button onClick={nextPage} disabled={currentPage === Math.ceil(movies.length / moviesPerPage)}>Next</button>
      </div>
    </div>
  );
};

export default AllMovies;
