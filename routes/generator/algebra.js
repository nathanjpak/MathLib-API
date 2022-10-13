const express = require("express");
const { randInt, calcArithmetic } = require("../../util/functions");
const router = express.Router();

const operationsDefault = [
  { name: "add", symbol: "+" }, 
  { name: "sub", symbol: "-" }, 
  { name: "mult", symbol: "*" }, 
  // { name: "div", symbol: "/" }
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
  let variable = "x";
  let steps = 2;
  if (query.steps) steps = query.steps;

  for (let i=count; i>0; i--) {
    const problem = {};
    const solution = randInt(1, -20, 20, { nonZero: true });
    const nums = randInt(steps, -20, 20, { nonZero: true });
    const ops = [];
    for (let j=steps; j>0; j--) {
      ops.push(operations[randInt(1, 0, operations.length-1)]);
    }
    let problemString = `${variable}`;
    let result = solution;
    for (let j=0; j<ops.length; j++) {
      result = calcArithmetic(ops[j].name, result, nums[j]);
      switch (ops[j].name) {
        case "mult":
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
    problem.nums = nums;
    problem.ops = ops;
    problem.result = result;
    problems.push(problem);
  }
  res.send(problems);
});

module.exports = router;
