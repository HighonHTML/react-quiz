export default function Options({ question, dispatch, answer }) {
  const disabled = answer != null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          disabled={disabled}
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            disabled
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}