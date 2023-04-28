import { MOVIESDB_BASE_URL, MOVIESDB_API_KEY } from "@env";

//function which handles the sending of get request to tmdb api
export const getMovies = async (url, optionalSettings) => {
  api_url = `${MOVIESDB_BASE_URL}${url}?api_key=${MOVIESDB_API_KEY}&language=en-US${optionalSettings}`;

  let response = await fetch(api_url, { method: "GET" });

  response = response.json();

  return response;
};

//function that is sent to our custom backend to get the quiz (it can be a custom quzi or a premade genre quiz)
export const getQuiz = async (url, movies, numberOfQuestions) => {
  api_url = `https://2bf3-95-236-193-238.ngrok-free.app/api${url}`;

  console.log(api_url);

  let response = null;

  if (movies) {
    response = await fetch(api_url, {
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
  } else {
    response = await fetch(api_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        numberOfQuestions: numberOfQuestions,
      }),
    });
  }

  response = response.json();
  console.log(response);

  return response;
};
