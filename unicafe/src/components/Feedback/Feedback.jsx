const Feedback = ({ setGood, setNeutral, setBad }) => {
  const handleSetGood = () => {
    setGood((prev) => prev + 1);
  };

  const handleSetNeutral = () => {
    setNeutral((prev) => prev + 1);
  };

  const handleSetBad = () => {
    setBad((prev) => prev + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => handleSetGood()}>good </button>
      <button onClick={() => handleSetNeutral()}>neutral</button>
      <button onClick={() => handleSetBad()}>bad</button>
    </div>
  );
};

export default Feedback;
