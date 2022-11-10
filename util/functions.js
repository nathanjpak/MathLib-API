const randInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Always returns an Array
const randInts = (iterations, digits, filter={ nonZero: false, nonNegative: true }) => {
  let max = "";
  for (let j=digits; j>0; j--) {
    max = max + "9";
  }
  max = parseInt(max);
  let min = -max;
  if (filter.nonNegative) min = 0;
  let nums = [];
  for (let i=iterations; i>0; i--) {
    let num = Math.floor(Math.random() * (max - min + 1) + min);
    if (filter.nonZero) {
      while (num === 0) {
        num = Math.floor(Math.random() * (max - min + 1) + min);
      }
    }
    nums.push(num);
  }
  return nums;
};

const calcArithmetic = (operation, num1, num2) => {
  switch (operation) {
    case "addition":
      return num1+num2;
    case "subtraction":
      return num1-num2;
    case "multiplication":
      return num1 * num2;
    case "division":
      return num1 / num2;
    default:
      return Math.pow(num1, num2);
  }
};

module.exports = { randInt, randInts, calcArithmetic }
