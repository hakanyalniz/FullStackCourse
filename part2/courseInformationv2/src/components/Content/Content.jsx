const Part = ({ index, course }) => {
  return (
    <p>
      {course.parts[index].name} {course.parts[index].exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((cour, index) => (
        <Part key={index} course={course} index={index} />
      ))}
    </>
  );
};

export default Content;
