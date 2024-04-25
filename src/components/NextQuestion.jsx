export default function NextQuestion({
  dispatch,
  answer,
  index,
  numOfQuestions,
}) {
  if (answer === null) return null;
  if (index + 1 < numOfQuestions) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next Question
      </button>
    );
  }
  if(index+1===numOfQuestions){
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
}
