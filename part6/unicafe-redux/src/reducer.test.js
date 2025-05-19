import { render, screen } from "@testing-library/react";
import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

import { setAction } from "./test_helper";

describe("unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("should return a proper initial state when called with undefined state", () => {
    const newState = setAction("DO_NOTHING", initialState);

    expect(newState).toEqual(initialState);
  });

  test("good is incremented", () => {
    const newState = setAction("GOOD", initialState);

    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test("ok is incremented", () => {
    const newState = setAction("OK", initialState);

    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test("bad is incremented", () => {
    const newState = setAction("BAD", initialState);

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  test("reset is incremented", () => {
    const newState = setAction("ZERO", initialState);

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    });
  });
});
