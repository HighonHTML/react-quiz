export default function Progress({
  points,
  index,
  numOfQuestions,
  maxPossiblePoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={numOfQuestions} value={index + Number(answer !== null)} />
      <p>
        <strong>{index}</strong>/<strong>{numOfQuestions}</strong>
      </p>
      <p>
        <strong>{points}</strong>/<strong>{maxPossiblePoints}</strong>
      </p>
    </header>
  );
}
