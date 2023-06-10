
const htmlTags = {
        moviesGrid: document.querySelector('.movies-grid'),
        movieHomePageButton: document.querySelector('#close-search-btn'),
        moviesSearchField: document.querySelector("#search-input"),
        moviesSearchButton: document.querySelector('#MovieSearchButton'),
        moviesViewMoreButton: document.querySelector('#load-more-movies-btn'),
        moviesPoster: document.querySelector('.movie-poster')
        

    }
const moviesObject = {} 


const apiKey =  '28643be3cedf66ea7800d4b1279f5236';
let page = 1;

movieApiUrls = {
    moviesData : `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=`,
    userSearchQuery : `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=` 
}

const callMovieApi = async () => {
    const moviesData = await fetch(movieApiUrls.moviesData+page)
    const moviesDataJson = await moviesData.json();
    return moviesDataJson
    
}

const callSearchMovieApi = async (movieSearchQueryurl) => {
    const moviesData = await fetch(movieSearchQueryurl)
    const moviesDataJson = await moviesData.json();
    return moviesDataJson

}

    // const moviesTrendingArray = async (movieApiObject) => {
    //     movieApiObject  = await 
    // }
const getMoviesTrendingArray = (movieApiObject) => {
    return movieApiObject.results
    
} 


const createElements= () => {
    const movieElements = {
     movieCardDiv: document.createElement('div'),
     movieImg: document.createElement('img'),
     movieTitle: document.createElement('h2'),
     movieVoteAvg: document.createElement('h3'),
     movieReleaseDate: document.createElement('h4'),
     movieOverView: document.createElement('h4')
    }
    return movieElements
}

const addMovieInfoToMovieElement =  (movieElements, movieObj) => {
    const movieApiImageUrl = "https://image.tmdb.org/t/p/w500/"
    movieElements.movieTitle.innerHTML = movieObj.title
    movieElements.movieImg.src = movieApiImageUrl + movieObj.poster_path
    movieElements.movieImg.alt = `This is a poster of ${movieObj.title}`
    movieElements.movieImg.id = `${movieObj.title}`
    movieElements.movieImg.onclick = 'showMoreMovieInformation()'
    movieElements.movieVoteAvg.innerHTML = `rating: ${movieObj.vote_average.toFixed(1)}`
    movieElements.movieReleaseDate.innerHTML = movieObj.release_date
    movieElements.movieOverView.innerHTML = movieObj.overview

}

const createMovieElementClasses = (movieElements) => {
    movieElements.movieCardDiv.className = 'movie-card'
    movieElements.movieTitle.className = "movie-title"
    movieElements.movieImg.className = "movie-poster"
    movieElements.movieVoteAvg.className = "movie-votes"
    movieElements.movieReleaseDate.className = "movie-release-date"
    movieElements.movieOverView.className = "movie-overview"
    
}


const addMovieElementtoMovieDiv = (movieElements) => {
    const movieBoxDiv = htmlTags.moviesGrid
    movieBoxDiv.appendChild(movieElements.movieCardDiv)
    movieElements.movieCardDiv.appendChild(movieElements.movieTitle)
    movieElements.movieCardDiv.appendChild(movieElements.movieImg)
    movieElements.movieCardDiv.appendChild(movieElements.movieVoteAvg)
    
}

const createTagsForMovie = (movieObj) => {
    const movieElements = createElements()
    addMovieInfoToMovieElement(movieElements, movieObj)
    createMovieElementClasses(movieElements)
    addMovieElementtoMovieDiv(movieElements)
    
} 

const populateMoviesOnPage = (moviesArray) => {
    moviesArray.forEach(movie => {
        createTagsForMovie(movie)
    });
} 

const searchMovie = () => {
    movieName = htmlTags.moviesSearchField.value
    movieRequested = movieApiUrls.userSearchQuery+movieName
    return movieRequested

}

const ifValidSearchShowSearchedMovie= async (event) => {
    movieSearchedfor = htmlTags.moviesSearchField.value
    if (movieSearchedfor== '' || movieSearchedfor == null){
        return false 
    }
    event.preventDefault();
    const call = await showSearchedMovie()

}

const showSearchedMovie = async () => {
    htmlTags.moviesGrid.innerHTML = ""
    movieRequested = searchMovie();
    const searchMovieApiObject = await callSearchMovieApi(movieRequested)
    const moviesArray = getMoviesTrendingArray(searchMovieApiObject)
    populateMoviesOnPage(moviesArray)
    
}

const showMoreMovies = () => {
    page += 1
    movies()
}

const populateMoviesObject = (movieObj) => {
    const movieElements = createElements()
    addMovieInfoToMovieElement(movieElements, movieObj)
    createMovieElementClasses(movieElements)
    moviesObject[movieElements.movieTitle.innerText] = {
        'overview' : movieObj.overview,
        'release_date' : movieObj.release_date
    }

}

const addMovieInformation = (moviesArray) => {
    moviesArray.forEach(movie => {
        populateMoviesObject(movie)
    })
}

const showMoreMovieInformation = () => {

}

const movies = async () => {
    const moviesApiObject = await callMovieApi()
    const moviesArray = getMoviesTrendingArray(moviesApiObject) 
    populateMoviesOnPage(moviesArray)
    addMovieInformation(moviesArray)
  
}


movies()

htmlTags.moviesSearchButton.addEventListener("click", ifValidSearchShowSearchedMovie)
htmlTags.moviesViewMoreButton.addEventListener("click", showMoreMovies)
