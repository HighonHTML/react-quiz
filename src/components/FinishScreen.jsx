export default function FinishScreen({ points, maxPossiblePoints, highscore, dispatch}) {
  return (
    <>
      <p className="result">
        you scored {points} out of {maxPossiblePoints}
      </p>
      <p className="highscore">(Highscore : {highscore} points)</p>
      <button className="btn btn-ui" onClick={()=>dispatch({type: 'restart'})}>Restart the quiz</button>
    </>
  );
}
