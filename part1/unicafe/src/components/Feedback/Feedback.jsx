// Forgot to mention the below in commit message for exercise 1.10
const Button = ({ text, handleButton }) => {
  return <button onClick={() => handleButton()}>{text}</button>;
};

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
      <Button text={"good"} handleButton={handleSetGood} />
      <Button text={"neutral"} handleButton={handleSetNeutral} />
      <Button text={"bad"} handleButton={handleSetBad} />
    </div>
  );
};

export default Feedback;
