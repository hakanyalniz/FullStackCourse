const Content = ({ parts, exercises }) => {
  const Part = ({ index }) => {
    return (
      <p>
        {parts[index]} {exercises[index]}
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
