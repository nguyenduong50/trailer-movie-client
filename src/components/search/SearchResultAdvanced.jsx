import React, { useState, useEffect } from 'react';
import './SearchResult.css';

const base_url = 'https://image.tmdb.org/t/p/original';

const SearchResultAdvanced = ({movies, searched, isLoading}) => {
	return(
		<div className='row'>
			<h2>Search Result</h2>
			{searched && !isLoading && movies.length === 0 && <h2 style={{textAlign: 'center', marginTop: '80px'}}>Not found movie!</h2>}
			{searched && isLoading && <h2 style={{textAlign: 'center', marginTop: '80px'}}>Loading ...</h2>}
			<div className='row_posters search-resul-container sc2'>				
				{
					movies.length > 0 &&
					movies.map((movie) => {
						return (
							<img
								key={movie.id}
								className={`row_poster row_posterLarge`}
								src={`${base_url}/${movie.poster_path}`} 
								alt={movie.name}
								loading="lazy"
							/>
						);
					})
				}
			</div>
		</div>
	)
};

export default SearchResultAdvanced;
