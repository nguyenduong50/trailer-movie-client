import React, { useEffect, useState } from 'react';
import Nav from '../../components/browse/Nav';
import SearchResultAdvanced from '../../components/search/SearchResultAdvanced';
import axios from '../../utils/axios';
import requests from '../../utils/requests';
import ErrorModal from '../../components/UI/ErrorModal';
import './Search.css';

const Search = () => {
	const [searchKeyword, setSearchKeyword] = useState('');
	const [searchGenre, setSearchGenre] = useState('');
	const [searchMediaType, setSearchMediaType] = useState('all');
	const [searchLanguage, setSearchLanguage] = useState('');
	const [searchYear, setSearchYear] = useState('');

	const [listMediaType, setListMediaType] = useState([]);

	const [searched, setSearched] = useState(false);
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState(null);

	const url = `${requests.fetchSearchAdvanced}`;

	const getSearchMovie = async(query) => {
		setErrors(null);
		setMovies([]);
		setIsLoading(true);
		try{
			const response = await axios.post(url, query);
			setMovies(response.data.results);
			setIsLoading(false);
		}
		catch(error){
			setErrors(error.response.data.error);
			setIsLoading(false);
		}
	};

	const errorHandler = () => {
		setErrors(null);
	};

	const changeYearHandle = (year) => {
		const yearMovie = Number(year);

		if(yearMovie < 0){
			setSearchYear(1970);
		} 
		else{
			setSearchYear(yearMovie);
		}
	}

	const resetSearch = () => {
		setSearchKeyword('');
		setSearchGenre('');
		setSearchYear('');
	}

	const handleSearch = (e) => {
		e.preventDefault();

		if(searchKeyword === ''){
			setErrors('Not found keyword parram');
			return;
		}

		const queryTemp = {
			keyword: searchKeyword,
			genre: searchGenre,
			mediaType: searchMediaType,
			language: searchLanguage,
			year: searchYear
		};

		getSearchMovie(queryTemp);
		setSearched(true);
		resetSearch();
	}

	const fetchMediaTypeList = async() => {
		const response = await axios.get(requests.fetchMediaTypeList);
		setListMediaType(response.data.results);
	}

	useEffect(() => {
		fetchMediaTypeList();
	}, []);

	return (
		<div className='app'>
			<Nav />
			<div className='s009'>
				<form onSubmit={handleSearch}>
					<div className='inner-form'>
						<div className='basic-search'>
							<div className='input-field'>
								<input
									type='text'
									placeholder='Type Keywords'
									onChange={(e) => setSearchKeyword(e.target.value)}
									value={searchKeyword}
								/>
							</div>
						</div>
						<div className='basic-search'>
							<div className='input-field'>
								<input
									type='text'
									placeholder='Type Genre'
									onChange={(e) => setSearchGenre(e.target.value)}
									value={searchGenre}
								/>
							</div>
							<div className='input-field'>
								<select onChange={(e) => setSearchMediaType(e.target.value)}>
									{
										listMediaType.length > 0 &&
										listMediaType.map((mediaType, index) => (
											<option key={index} value={mediaType}>{mediaType}</option>
										))
									}
								</select>
								{/* <input
									type='text'
									placeholder='Type Media type'
									onChange={(e) => setSearchMediaType(e.target.value)}
									value={searchMediaType}
								/> */}
							</div>
						</div>
						<div className='basic-search'>
							<div className='input-field'>
								<select onChange={(e) => setSearchLanguage(e.target.value)}>
									<option value="" selected>Choose language</option>
									<option value="en">English</option>
									<option value="ja">Japan</option>
									<option value="ko">Korea</option>
								</select>
								{/* <input
									type='text'
									placeholder='Type Language'
									onChange={(e) => setSearchLanguage(e.target.value)}
									value={searchLanguage}
								/> */}
							</div>
							<div className='input-field'>
								<input
									type='number'
									placeholder='Type Year'
									onChange={(e) => changeYearHandle(e.target.value)}
									value={searchYear}
								/>
							</div>
						</div>
						<div className='advance-search'>
							<div className='row third'>
								<div className='input-field'>
									<div className='result-count'>
										
									</div>
									<div className='group-btn'>
										<button
											className='btn-delete'
											onClick={resetSearch}
											type='button'
										>
											RESET
										</button>
										<button
											className='btn-search'
											type='submit'										
										>
											SEARCH
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
			<SearchResultAdvanced movies={movies} searched={searched} isLoading={isLoading} />
			{
				errors &&
				<ErrorModal
					title='Error'
					message={errors}
					onConfirm={errorHandler}
				/>
			}
		</div>
	);
};

export default Search;
