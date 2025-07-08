const getNext = () => {
  return ++getNext.count;
};

const newFunc = () => {
  newFunc.adi = "hakan";

  return newFunc.adi;
};

function oldFunc() {
  oldFunc.newad = "Serkan";
  return 0;
}

class classSerkan {
  ad = "saerkan";

  getSearkan() {
    return this.ad;
  }
}

getNext.count = 0;

console.log(getNext());
console.log(getNext());
console.log(getNext.count);

console.log(newFunc);
oldFunc();
console.log(oldFunc);

const newSerkan = new classSerkan();
console.log(newSerkan);

const hakan = {
  newSer() {
    return "Serkan";
  },
};
