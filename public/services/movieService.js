const api_key = 'a72d8527794893f7001e80474f4e7811';

export const getMovies = async () => {
  const threeMonthsAgo = dateFns.subMonths(new Date(), 3);
  const dateStr = dateFns.format(threeMonthsAgo, 'YYYY-MM-DD');
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie/?api_key=${api_key}&primary_release_date.gte=${dateStr}`);
  if (response.ok) {
    const json = await response.json();

    return json.results;
  } else {
    throw Error(response.status)
  }
};

export const searchMovies = async (query) => {
  const response = await fetch(`https://api.themoviedb.org/3/search/movie/?api_key=${api_key}&query=${query}`);
  if (response.ok) {
    const json = await response.json();

    return json.results;
  } else {
    throw Error(response.status)
  }
}


