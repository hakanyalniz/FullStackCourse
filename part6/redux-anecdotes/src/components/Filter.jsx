import { createAction } from "../reducers/anecdoteFilterReducer";
import { useSelector, useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    console.log(event.target.value);
    const filter = event.target.value;
    dispatch(createAction("FILTER", { filter }));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default Filter;
