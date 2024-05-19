const tokenList = [
	{
		userId: "User 01",
		token: "8qlOkxz4wq"
	},
	{
		userId: "User 02",
		token: "RYoOcWM4JW"
	}
];

const requests = {
	fetchNetflixOriginals: `/movies/net-flix?token=${tokenList[0].token}`,
	fetchTrending: `/movies/trending?token=${tokenList[0].token}`,
	fetchTopRated: `/movies/top-rate?token=${tokenList[0].token}`,
	fetchActionMovies: `/movies/discover?token=${tokenList[0].token}&genre_id=28`,
	fetchComedyMovies: `/movies/discover?token=${tokenList[0].token}&genre_id=35`,
	fetchHorrorMovies: `/movies/discover?token=${tokenList[0].token}&genre_id=27`,
	fetchRomanceMovies: `/movies/discover?token=${tokenList[0].token}&genre_id=10749`,
	fetchDocumentaries: `/movies/discover?token=${tokenList[0].token}&genre_id=99`,
	fetchSearch: `/movies/search?token=${tokenList[0].token}`,
	fetchVideoTrailer: `/movies/video?token=${tokenList[0].token}`,
	fetchSearchAdvanced: `/movies/search-advanced?token=${tokenList[0].token}`,
	fetchMediaTypeList: `/media-type?token=${tokenList[0].token}`,
}

export default requests;
