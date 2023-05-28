import React, { createContext, useState } from "react";

//context is used for allowing the data to be accessed from any of the app components
export const QuestionsContext = createContext([]);

function QuestionsContextProvider({ children }) {
  const [questions, setQuestions] = useState([]);

  return (
    <QuestionsContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionsContext.Provider>
  );
}

export default QuestionsContextProvider;
