const express = require("express");
const { randInt, randInts, calcArithmetic } = require("../../util/functions");
const router = express.Router();

const operationsDefault = [
  { name: "addition", symbol: "+" }, 
  { name: "subtraction", symbol: "-" }, 
  { name: "multiplication", symbol: `\\cdot` }, 
  // { name: "Division", symbol: "/" }
];

router.get("/", (req, res) => {
  res.send("Oops");
  
});
router.get("/linear", (req, res) => {
  const query = req.query;
  const problems = [];
  let count = 20;
  if (query.count) count = query.count;
  let operations = operationsDefault;
  if (query.operations) {
    let temp1 = query.operations.split(",");
    operations = operationsDefault.filter((element) => {
      return temp1.includes(element.name);
    });
    console.log(operations);
  };
  let variable = "x";
  let steps = 2;
  if (query.steps) steps = query.steps;
  let digits = 2;
  if (query.digits) digits = query.digits;


  for (let i=count; i>0; i--) {
    const problem = {};
    const solution = randInts(1, digits, { nonNegative: false })[0];
    const nums = randInts(steps, digits, { nonZero: true, nonNegative: false });
    const ops = [];
    for (let j=steps; j>0; j--) {
      ops.push(operations[randInt(0, operations.length-1)]);
    }
    let problemString = `${variable}`;
    let result = solution;
    // if (ops.length === 1) {
    //   result = calcArithmetic(ops[0].name, result, nums[j]);

    // }
    for (let j=0; j<ops.length; j++) {
      result = calcArithmetic(ops[j].name, result, nums[j]);
      switch (ops[j].name) {
        case "multiplication":
          problemString = (j === 0) ? `${nums[j]}${problemString}` : `${nums[j]}(${problemString})`;
          break;
        case "div":
          problemString = (j===0) ? `${problemString} / ${nums[j]}` : `(${problemString}) / ${nums[j]}`;
          break;
        default:
          problemString = (nums[j] < 0) ? `${problemString} ${ops[j].symbol} (${nums[j]})` : `${problemString} ${ops[j].symbol} ${nums[j]}`;
      }
      if (j+1 === ops.length) problemString = `${problemString} = ${result}`;
    }
    problem.problem = problemString;
    problem.solution = solution;
    problems.push(problem);
  }
  res.send(problems);
});

module.exports = router;
