import { MOVIESDB_BASE_URL, MOVIESDB_API_KEY } from "@env";

//function which handles the sending of get request to tmdb api
export const getMovies = async (url, optionalSettings) => {
  api_url = `${MOVIESDB_BASE_URL}${url}?api_key=${MOVIESDB_API_KEY}&language=en-US${optionalSettings}`;

  let response = await fetch(api_url, { method: "GET" });

  response = response.json();

  return response;
};
