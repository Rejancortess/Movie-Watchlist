const movieTitle = document.getElementById('movie-title');
const submitBTn = document.getElementById('submit-btn');
const main = document.getElementById('main');

const key = 'd14fbb5e';
let title = '';

async function searchMovie() {
  const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${title}`);
  const data = await res.json();
  for (let movie of data.Search) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${movie.imdbID}`);
    const data = await res.json();
    main.innerHTML += `
    <div class="movie-container" id='movie-container'>
        <img class="movie-poster" src="${data.Poster}" />
        <div>
          <div class="movie-details">
            <h2>${data.Title}</h2>
            <span><img width="20px" src="images/Icon.svg" alt="" /></span>
            <span>${data.imdbRating}</span>
          </div>
          <div class="genre">
            <div class="genre-details">
              <span class="mins">${data.Runtime}</span>
              <span>${data.Genre}</span>
            </div>
            <div>
              <img class='add-watchlist' id="${movie.imdbID}" src="images/Icon (1).png " alt="" />
              <p class="watchlist">Watchlist</p>
            </div>
          </div>
          <p class="movie-p">${data.Plot}</p>
        </div>
      </div>
      <hr>`;
  }
}

let watchlistArrayy = JSON.parse(localStorage.getItem('watchList')) || [];

submitBTn.addEventListener('click', (e) => {
  e.preventDefault();
  title = movieTitle.value;
  main.innerHTML = '';
  searchMovie();
  document.querySelector('.explore-img').style.display = 'none';
});

main.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-watchlist')) {
    const movieId = e.target.id;

    if (!watchlistArrayy.includes(movieId)) {
      watchlistArrayy.push(movieId);
      localStorage.setItem('watchList', JSON.stringify(watchlistArrayy));
      console.log('Added to watchlist:', movieId);
    } else {
      console.log('Movie already in watchlist:', movieId);
    }

    console.log('Current watchlist:', watchlistArrayy);
  }
});

document.getElementById('my-watchlist').addEventListener('click', (e) => {
  localStorage.setItem('watchList', JSON.stringify(watchlistArrayy));
  window.location.href = 'watch_list.html';
});

const searchMoviesLink = document.getElementById('search-movies');
if (searchMoviesLink) {
  searchMoviesLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = 'index.html';
  });
}
