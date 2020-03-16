global.dateFns = {
  subMonths: () => new Date(),
  format: () => '2020-03-20'
}

global.window = {
  sorting: "none",
  movieType: "All movies",
  allMovies: [],
  movies: []
}

global.localStorage = {
  store:{},
  getItem: (key)=>this.store[key],
  setItem: (key, value)=> this.store[key] = value
}

global.resetAllState = () => {
  this.window = {
    sorting: "none",
    movieType: "All movies",
    allMovies: [],
    movies: []
  }
}
