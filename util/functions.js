const randInt = (iterations, min=0, max=99, filter={ nonZero: false }) => {
  if (iterations > 1) {
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
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const calcArithmetic = (operation, num1, num2) => {
  switch (operation) {
    case "add":
      return num1+num2;
    case "sub":
      return num1-num2;
    case "mult":
      return num1 * num2;
    case "div":
      return num1 / num2;
    default:
      return Math.pow(num1, num2);
  }
};

module.exports = { randInt, calcArithmetic }
