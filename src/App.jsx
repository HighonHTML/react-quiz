import { useEffect } from "react";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import { useReducer } from "react";

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
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
    default:
      console.log("default");
      throw new Error("Action unknown");
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
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
      <Main className="main">
        <p>1/15</p>
        <p>Question</p>
      </Main>
    </div>
  );
}

export default App;