import fetchMock from 'fetch-mock-jest';

import { getMovies, searchMovies } from './movieService.js';

describe("movie service", () => {
  describe("when we request movies", () => {
    describe("and request is successful", () => {
      beforeEach(() => {
        fetchMock.get('begin:https://api.themoviedb.org/3/discover/movie/', {results: ['movie 1', 'movie 2', 'movie 3']})
      });

      it("should return movies", async () => {
        const movies = await getMovies();

        expect(movies).toEqual(['movie 1', 'movie 2', 'movie 3']);
      });

      afterEach(() => {
        fetchMock.restore();
      });
    });

    describe("and request is NOT successful", () => {
      beforeEach(() => {
        fetchMock.get('begin:https://api.themoviedb.org/3/discover/movie/', 404)
      });

      it("should throw an error with status code", async () => {
        try {
          await getMovies()
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty('message', "404");
        }
      });

      afterEach(() => {
        fetchMock.restore();
      });
    });

    describe("and there is a network failure", () => {
      beforeEach(() => {
        fetchMock.get('begin:https://api.themoviedb.org/3/discover/movie/', {throws: new Error("network error") })
      });

      it("should throw an error", async () => {
        try {
          await getMovies()
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty('message', 'network error');
        }
      });

      afterEach(() => {
        fetchMock.restore();
      })
    })
  });

  describe("when we search for movies", () => {
    describe("and request is successful", () => {
      beforeEach(() => {
        fetchMock.get('begin:https://api.themoviedb.org/3/search/movie/', {results: ['movie A', 'movie B', 'movie C']})
      });

      it("should return movies", async () => {
        const movies = await searchMovies("some search");

        expect(movies).toEqual(['movie A', 'movie B', 'movie C']);
      });

      afterEach(() => {
        fetchMock.restore();
      });
    });

    describe("and request is NOT successful", () => {
      beforeEach(() => {
        fetchMock.get('begin:https://api.themoviedb.org/3/search/movie/', 404)
      });

      it("should throw an error with status code", async () => {
        try {
          await searchMovies("bad search")
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty('message', "404");
        }
      });

      afterEach(() => {
        fetchMock.restore();
      });
    });

    describe("and there is a network failure", () => {
      beforeEach(() => {
        fetchMock.get('begin:https://api.themoviedb.org/3/search/movie/', {throws: new Error("network error") })
      });

      it("should throw an error", async () => {
        try {
          await searchMovies("some search")
        } catch (error) {
          expect(error).toBeInstanceOf(Error);
          expect(error).toHaveProperty('message', 'network error');
        }
      });

      afterEach(() => {
        fetchMock.restore();
      })
    })
  });
});

