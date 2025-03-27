const Total = ({ course }) => {
  const totalCourse = course.parts.reduce((sum, current) => {
    return (sum += current.exercises);
  }, 0);

  return (
    <>
      <p>total of {totalCourse} exercises</p>
    </>
  );
};

export default Total;
