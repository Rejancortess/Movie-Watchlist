const key = 'd14fbb5e';
const mainEl = document.getElementById('main');
const searchMoviesEl = document.getElementById('search-movies');
let savedWatchlist = JSON.parse(localStorage.getItem('watchList')) || [];

async function renderWatchList() {
  if (savedWatchlist.length !== 0) {
    document.querySelector('.watchlist-msg').style.display = 'none';
  } else {
    document.querySelector('.watchlist-msg').style.display = 'block';
  }
  for (let movieId of savedWatchlist) {
    const res = await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${movieId}`);
    const data = await res.json();
    mainEl.innerHTML += `
    <div class="movie-container movie-card">
        <img class="movie-poster" src="${data.Poster}" />
        <div>
          <div class="movie-details">
            <h2>${data.Title}</h2>
            <span><img width="20px" src="images/star.svg"/></span>
            <span>${data.imdbRating}</span>
          </div>
          <div class="genre">
            <div class="genre-details">
              <span class="mins">${data.Runtime}</span>
              <span>${data.Genre}</span>
            </div>
            <div>
              <img data-id='${movieId}' class='remove-btn' src="images/remove-icon.png" alt="" />
              <p class="watchlist">Remove</p>
            </div>
          </div>
          <p class="movie-p">${data.Plot}</p>
        </div>
      </div>`;
  }
}

renderWatchList();

searchMoviesEl.addEventListener('click', (e) => {
  localStorage.setItem('watchList', JSON.stringify(savedWatchlist));
  window.location.href = 'index.html';
});

mainEl.addEventListener('click', (e) => {
  for (let movieID of savedWatchlist) {
    if (e.target.dataset.id === movieID) {
      console.log(e.target.dataset.id);
      savedWatchlist = savedWatchlist.filter((id) => id !== e.target.dataset.id);
      localStorage.setItem('watchList', JSON.stringify(savedWatchlist));
      console.log(savedWatchlist);
      e.target.closest('.movie-container').remove();
    }
  }
});
