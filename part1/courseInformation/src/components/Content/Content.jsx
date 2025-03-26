const Content = ({ course }) => {
  const Part = ({ index }) => {
    return (
      <p>
        {course.parts[index].name} {course.parts[index].exercises}
      </p>
    );
  };

  return (
    <>
      <Part index={0} />
      <Part index={1} />
      <Part index={2} />
    </>
  );
};

export default Content;
