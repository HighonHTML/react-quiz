import { useEffect } from "react";
import Header from "./Header.jsx";
import Content from "./Content.jsx";
import { useReducer } from "react";
import StartScreen from "./StartScreen.jsx";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import Question from "./Question.jsx";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

function reducer(state, action) {
  console.log("reducer runs");
  switch (action.type) {
    case "dataRecieved":
      console.log("data fetched");
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      console.log("datafailed");
      return {
        ...state,
        status: "error",
      };

    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption == action.payload
            ? state.points + question.points
            : state.points,
      };
    default:
      console.log("default");
      throw new Error("Action unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points } = state;
  useEffect(function () {
    async function getQuestions() {
      try {
        const response = await fetch("http://localhost:9000/questions");
        const data = await response.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      }
    }
    getQuestions();
  }, []);
  return (
    <div className="app">
      <Header />
      <Content className="main">
        {status == "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numOfQuestions={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Content>
    </div>
  );
}

export default App;