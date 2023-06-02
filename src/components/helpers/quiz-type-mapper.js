export function quizTypeMapper(quizType) {
  switch (quizType) {
    case "drama":
      return "Drama";
    case "thriller":
      return "Thriller";
    case "animation":
      return "Animation";
    case "fantasy":
      return "Fantasy";
    case "comedy":
      return "Comedy";
    case "action":
      return "Action";
    case "horror":
      return "Horror";
    case "romance":
      return "Romance";
  }
}
