import { renderMovies, toggleFavourites, renderUI, movieTypeChange, sortingChange, searchChange } from "./view.js";

describe("render movies", () => {
  describe("and the sorting is OFF", () => {
    it("should render a list of movies as they come", () => {
      localStorage.setItem("favourites", JSON.stringify([]));
      window.sorting = "none";
      window.movies = [
        {
          id: 1,
          vote_average: 3.2,
          poster_path: '/movie_1.jpg',
          title: 'Movie 1',
          release_date: '2019-03-01',
          overview: 'A a a a a 1'
        },
        {
          id: 2,
          vote_average: 6.2,
          poster_path: '/movie_2.jpg',
          title: 'Movie 2',
          release_date: '2018-05-06',
          overview: 'B b b b b 2'
        }
      ];
      const expected = `<div class="movie">
      <div class="img-container">
        <div class="vote">32%</div>
        <img src="https://image.tmdb.org/t/p/h100/movie_1.jpg" />
      </div>
      <div class="description">
        <div class="title">Movie 1<span class="year">(2019-03-01)</span></div>
        <div class="overview">A a a a a 1</div>
      </div>
      <div class="divider-container">
        <div class="divider"></div>
      </div>
      <div class="cta">
        <button class="button--add-to-favourites" onclick="toggleFavourites(1)">&#10084;</button>
        <button class="button--more-info">More info</button>
      </div>
    </div><div class="movie">
      <div class="img-container">
        <div class="vote">62%</div>
        <img src="https://image.tmdb.org/t/p/h100/movie_2.jpg" />
      </div>
      <div class="description">
        <div class="title">Movie 2<span class="year">(2018-05-06)</span></div>
        <div class="overview">B b b b b 2</div>
      </div>
      <div class="divider-container">
        <div class="divider"></div>
      </div>
      <div class="cta">
        <button class="button--add-to-favourites" onclick="toggleFavourites(2)">&#10084;</button>
        <button class="button--more-info">More info</button>
      </div>
    </div>`;
      const result = renderMovies();

      expect(result).toEqual(expected);
    });
  });

  describe("and the sorting is ON", () => {
    it("should render movies with highest vote first", () => {
      localStorage.setItem("favourites", JSON.stringify([]));
      window.sorting = "highest_rating";
      window.movies = [
        {
          id: 1,
          vote_average: 2.1,
          poster_path: '/movie_1.jpg',
          title: 'Movie 1',
          release_date: '2019-03-01',
          overview: 'A a a a a 1'
        },
        {
          id: 2,
          vote_average: 9.1,
          poster_path: '/movie_2.jpg',
          title: 'Movie 2',
          release_date: '2018-05-06',
          overview: 'B b b b b 2'
        },
        {
          id: 3,
          vote_average: 5.2,
          poster_path: '/movie_3.jpg',
          title: 'Movie 3',
          release_date: '2019-01-10',
          overview: 'C c c c c 2'
        }
      ];
      const expected = `<div class="movie">
      <div class="img-container">
        <div class="vote">91%</div>
        <img src="https://image.tmdb.org/t/p/h100/movie_2.jpg" />
      </div>
      <div class="description">
        <div class="title">Movie 2<span class="year">(2018-05-06)</span></div>
        <div class="overview">B b b b b 2</div>
      </div>
      <div class="divider-container">
        <div class="divider"></div>
      </div>
      <div class="cta">
        <button class="button--add-to-favourites" onclick="toggleFavourites(2)">&#10084;</button>
        <button class="button--more-info">More info</button>
      </div>
    </div><div class="movie">
      <div class="img-container">
        <div class="vote">52%</div>
        <img src="https://image.tmdb.org/t/p/h100/movie_3.jpg" />
      </div>
      <div class="description">
        <div class="title">Movie 3<span class="year">(2019-01-10)</span></div>
        <div class="overview">C c c c c 2</div>
      </div>
      <div class="divider-container">
        <div class="divider"></div>
      </div>
      <div class="cta">
        <button class="button--add-to-favourites" onclick="toggleFavourites(3)">&#10084;</button>
        <button class="button--more-info">More info</button>
      </div>
    </div><div class="movie">
      <div class="img-container">
        <div class="vote">21%</div>
        <img src="https://image.tmdb.org/t/p/h100/movie_1.jpg" />
      </div>
      <div class="description">
        <div class="title">Movie 1<span class="year">(2019-03-01)</span></div>
        <div class="overview">A a a a a 1</div>
      </div>
      <div class="divider-container">
        <div class="divider"></div>
      </div>
      <div class="cta">
        <button class="button--add-to-favourites" onclick="toggleFavourites(1)">&#10084;</button>
        <button class="button--more-info">More info</button>
      </div>
    </div>`;
      const result = renderMovies();

      expect(result).toEqual(expected);
    });
  });

  it("should render favourites", () => {
    localStorage.setItem("favourites", JSON.stringify([2]));
    window.sorting = "none";
    window.movies = [
      {
        id: 1,
        vote_average: 3.2,
        poster_path: '/movie_1.jpg',
        title: 'Movie 1',
        release_date: '2019-03-01',
        overview: 'A a a a a 1'
      },
      {
        id: 2,
        vote_average: 6.2,
        poster_path: '/movie_2.jpg',
        title: 'Movie 2',
        release_date: '2018-05-06',
        overview: 'B b b b b 2'
      }
    ];
    const expected = `<div class="movie">
      <div class="img-container">
        <div class="vote">32%</div>
        <img src="https://image.tmdb.org/t/p/h100/movie_1.jpg" />
      </div>
      <div class="description">
        <div class="title">Movie 1<span class="year">(2019-03-01)</span></div>
        <div class="overview">A a a a a 1</div>
      </div>
      <div class="divider-container">
        <div class="divider"></div>
      </div>
      <div class="cta">
        <button class="button--add-to-favourites" onclick="toggleFavourites(1)">&#10084;</button>
        <button class="button--more-info">More info</button>
      </div>
    </div><div class="movie">
      <div class="img-container">
        <div class="vote">62%</div>
        <img src="https://image.tmdb.org/t/p/h100/movie_2.jpg" />
      </div>
      <div class="description">
        <div class="title">Movie 2<span class="year">(2018-05-06)</span></div>
        <div class="overview">B b b b b 2</div>
      </div>
      <div class="divider-container">
        <div class="divider"></div>
      </div>
      <div class="cta">
        <button class="button--add-to-favourites favourite" onclick="toggleFavourites(2)">&#10084;</button>
        <button class="button--more-info">More info</button>
      </div>
    </div>`;
    const result = renderMovies();

    expect(result).toEqual(expected);
  });
});

describe("show different movie types", () => {
  describe("and favourites are chosen", () => {
    it("should show favourites", () => {
      addDOM();
      window.allMovies = [
        {
          id: 1,
          vote_average: 2.1,
          poster_path: '/movie_1.jpg',
          title: 'Movie 1',
          release_date: '2019-03-01',
          overview: 'A a a a a 1'
        },
        {
          id: 2,
          vote_average: 9.1,
          poster_path: '/movie_2.jpg',
          title: 'Movie 2',
          release_date: '2018-05-06',
          overview: 'B b b b b 2'
        },
        {
          id: 3,
          vote_average: 5.2,
          poster_path: '/movie_3.jpg',
          title: 'Movie 3',
          release_date: '2019-01-10',
          overview: 'C c c c c 3'
        }
      ];
      localStorage.setItem("favourites", JSON.stringify([2]));

      movieTypeChange("favourites");

      expect(document.getElementsByClassName("movie-list")[0].innerHTML).toEqual(`<div class="movie">
      <div class="img-container">
        <div class="vote">91%</div>
        <img src="https://image.tmdb.org/t/p/h100/movie_2.jpg">
      </div>
      <div class="description">
        <div class="title">Movie 2<span class="year">(2018-05-06)</span></div>
        <div class="overview">B b b b b 2</div>
      </div>
      <div class="divider-container">
        <div class="divider"></div>
      </div>
      <div class="cta">
        <button class="button--add-to-favourites favourite" onclick="toggleFavourites(2)">❤</button>
        <button class="button--more-info">More info</button>
      </div>
    </div>`);
    });
  });

  describe("and all movies are chosen", () => {
    it("should show all movies", () => {
      addDOM();
      window.sorting = "none";
      window.allMovies = [
        {
          id: 1,
          vote_average: 2.1,
          poster_path: '/movie_1.jpg',
          title: 'Movie 1',
          release_date: '2019-03-01',
          overview: 'A a a a a 1'
        },
        {
          id: 2,
          vote_average: 9.1,
          poster_path: '/movie_2.jpg',
          title: 'Movie 2',
          release_date: '2018-05-06',
          overview: 'B b b b b 2'
        }
      ];
      localStorage.setItem("favourites", JSON.stringify([2]));

      movieTypeChange("all");

      expect(document.getElementsByClassName("movie-list")[0].innerHTML).toEqual(`<div class="movie">
      <div class="img-container">
        <div class="vote">21%</div>
        <img src="https://image.tmdb.org/t/p/h100/movie_1.jpg">
      </div>
      <div class="description">
        <div class="title">Movie 1<span class="year">(2019-03-01)</span></div>
        <div class="overview">A a a a a 1</div>
      </div>
      <div class="divider-container">
        <div class="divider"></div>
      </div>
      <div class="cta">
        <button class="button--add-to-favourites" onclick="toggleFavourites(1)">❤</button>
        <button class="button--more-info">More info</button>
      </div>
    </div><div class="movie">
      <div class="img-container">
        <div class="vote">91%</div>
        <img src="https://image.tmdb.org/t/p/h100/movie_2.jpg">
      </div>
      <div class="description">
        <div class="title">Movie 2<span class="year">(2018-05-06)</span></div>
        <div class="overview">B b b b b 2</div>
      </div>
      <div class="divider-container">
        <div class="divider"></div>
      </div>
      <div class="cta">
        <button class="button--add-to-favourites favourite" onclick="toggleFavourites(2)">❤</button>
        <button class="button--more-info">More info</button>
      </div>
    </div>`);
    });
  });
});

function addDOM() {
  const list = document.createElement('div');
  list.setAttribute("class", "movie-list");
  document.body.appendChild(list);
  const counterHeader = document.createElement('div');
  counterHeader.setAttribute("class", "counter-header");
  document.body.appendChild(counterHeader);
  const counterMessage = document.createElement('div');
  counterMessage.setAttribute("class", "counter-message");
  document.body.appendChild(counterMessage);
}
