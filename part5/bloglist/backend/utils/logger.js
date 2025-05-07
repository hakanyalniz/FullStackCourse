const info = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.log(...params);
  }
};

const error = (...params) => {
  if (process.env.NODE_ENV !== "test") {
    console.error(...params);
  }
};

const testLog = (...params) => {
  if (process.env.NODE_ENV === "test") {
    console.log(...params);
  }
};

module.exports = { info, error, testLog };
