const randInt = (iterations, min=0, max=99) => {
  if (iterations > 1) {
    let nums = [];
    for (let i=iterations; i>0; i--) {
      let num = Math.floor(Math.random() * (max - min + 1) + min);
      nums.push(num);
    }
    return nums;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

module.exports = { randInt }
