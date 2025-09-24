let savedWatchlist = JSON.parse(localStorage.getItem('watchList')) || [];

const key = 'd14fbb5e';
const mainEl = document.getElementById('main');
console.log(savedWatchlist);

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
              <img class='add-watchlist' src="images/Icon (1).png " alt="" />
              <p class="watchlist">Watchlist</p>
            </div>
          </div>
          <p class="movie-p">${data.Plot}</p>
        </div>
      </div>
      <hr>`;
  }
}

renderWatchList();

document.getElementById('search-movies').addEventListener('click', (e) => {
  localStorage.setItem('watchList', JSON.stringify(savedWatchlist));
  window.location.href = 'index.html';
});
