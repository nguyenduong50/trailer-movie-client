import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import movieTrailer from 'movie-trailer';
import MovieDetail from '../../components/browse/MovieDetail';
import requests from '../../utils/requests';
import './MovieList.css';

const base_url = 'https://image.tmdb.org/t/p/original';
const movies_limit = 10;

function MovieList({ title, fetchUrl, isLargeRow }) {
	const [movies, setMovies] = useState([]);
	const [trailerUrl, setTrailerUrl] = useState(null);
	const [message, setMessage] = useState(null);
	const [selectedMovie, setSelectedMovie] = useState(null);

	const fetchVideoTrailer = async(movieId) => {
		try{
			const response = await axios.post(`${requests.fetchVideoTrailer}&film_id=${movieId}`);
			if(response.data.results){
				setTrailerUrl(response.data.results.key);
			}
		}
		catch (error){
			setTrailerUrl(null);
			setMessage(error.response.data.message);
		}
	};

	useEffect(() => {
		const fetchData = async() => {
			try{
				const response = await axios.get(fetchUrl);
				setMovies(response.data.results);
			}
			catch (error){
				console.log(error.response.data);
			}
		};

		fetchData();
	}, [fetchUrl]);

	const handleClick = (movie) => {
		setMessage(null);
		
		//Hidden video trailer
		if (selectedMovie && selectedMovie.id === movie.id) {
			setSelectedMovie(null);
			setTrailerUrl(null);
		} 

		//Show video trailer
		if(!selectedMovie) {
			setSelectedMovie(movie);
			fetchVideoTrailer(movie.id);
		}
		if(selectedMovie && selectedMovie.id !== movie.id) {
			setSelectedMovie(movie);
			fetchVideoTrailer(movie.id);
		}
	};

	return ( 
		<div className='row'>
			<h2 className="movie-list-title">{title}</h2>
			<div className='row_posters sc2'>
				{movies.map((movie) => {
					return (
						<img 
							key={movie.id}
							onClick={() => handleClick(movie)}
							className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
							src={`${base_url}/${
								isLargeRow ? movie.poster_path : movie.backdrop_path
							}`}
							alt={movie.title}
							loading="lazy"
						/>
					);
				})}
			</div>
			<div style={{ padding: '40px' }}>
				{
					selectedMovie && 
					<MovieDetail 
						movieData={selectedMovie} 
						movieTrailer={trailerUrl} 
						message={message}
					/>
				}
			</div>
		</div>
	);
}

export default MovieList;
