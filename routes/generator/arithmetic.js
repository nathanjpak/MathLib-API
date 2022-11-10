const express = require("express");
const { randInt, randInts, calcArithmetic } = require("../../util/functions");
const router = express.Router();

const operationsDefault = ["addition", "subtraction", "multiplication", "division"];

router.get("/", (req, res) => {
  const query = req.query;
  const problems = [];
  let count = 20;
  if (query.count) count = query.count;
  let operations = operationsDefault;
  if (query.operations) operations = query.operations.split(",");
  let digits = 2;
  if (query.digits) digits = query.digits;
  // let operands = ["Natural"];
  // if (query.operands) operands = query.operands;
  for (let i=count; i>0; i--) {
    const problem = {};
    let nums = randInts(2, digits);
    const operation = operations[randInt(0, operations.length-1)];
    switch (operation) {
      case "addition": 
        problem.problem = `${nums[0]} + ${nums[1]}`;
        problem.solution = calcArithmetic(operation, nums[0], nums[1]);
        // problem.solution = nums[0] + nums[1];
        break;
      case "subtraction": 
        problem.problem = `${nums[0]} - ${nums[1]}`;
        problem.solution = calcArithmetic(operation, nums[0], nums[1]);
        // problem.solution = nums[0] - nums[1];
        break;
      case "multiplication":
        problem.problem = `${nums[0]} \\cdot ${nums[1]}`;
        problem.solution = calcArithmetic(operation, nums[0], nums[1]);
        // problem.solution = nums[0] * nums[1];
        break;
      default:
        problem.problem = `${nums[0]} \\div ${nums[1]}`;
        problem.solution = Math.round((calcArithmetic(operation, nums[0], nums[1]) * 100))/100;
    }
    problems.push(problem);
  }
  res.send(problems);
});

module.exports = router;
