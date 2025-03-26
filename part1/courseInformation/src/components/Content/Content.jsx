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
      <Part course={course} index={0} />
      <Part course={course} index={1} />
      <Part course={course} index={2} />
    </>
  );
};

export default Content;
