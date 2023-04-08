import { MOVIESDB_BASE_URL, MOVIESDB_API_KEY, NGROK_URL } from "@env";

//function which handles the sending of get request to tmdb api
export const getMovies = async (url, optionalSettings) => {
  api_url = `${MOVIESDB_BASE_URL}${url}?api_key=${MOVIESDB_API_KEY}&language=en-US${optionalSettings}`;

  let response = await fetch(api_url, { method: "GET" });

  response = response.json();

  return response;
};

export const getQuiz = async (url, movies, numberOfQuestions) => {
  api_url = `https://f863-95-236-158-58.ngrok-free.app/api${url}`;

  console.log(api_url);

  let response = await fetch(api_url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      movies: movies,
      numberOfQuestions: numberOfQuestions,
    }),
  });
  response = response.json();

  return response;
};
