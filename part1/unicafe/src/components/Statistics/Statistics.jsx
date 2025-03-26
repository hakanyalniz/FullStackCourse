const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td> {value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1 + bad * -1) / total;
  const positive = (good / total) * 100;

  return (
    <div>
      <h1>statistics</h1>
      {total == 0 ? (
        <div>No data available</div>
      ) : (
        <table>
          <tbody>
            <StatisticLine text={"good"} value={good} />

            <StatisticLine text={"neutral"} value={neutral} />

            <StatisticLine text={"bad"} value={bad} />

            <StatisticLine text={"all"} value={total} />

            <StatisticLine text={"average"} value={average} />

            <StatisticLine text={"positive %"} value={positive} />
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Statistics;
