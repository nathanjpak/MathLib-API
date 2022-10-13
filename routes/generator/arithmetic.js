const express = require("express");
const { randInt } = require("../../util/functions");
const router = express.Router();

const operationsDefault = ["add", "sub", "mult", "div", "pow"];

router.get("/", (req, res) => {
  const query = req.query;
  const problems = {};
  let count = 20;
  if (query.count) count = query.count;
  let operations = operationsDefault;
  if (query.operations) operations = query.operations;
  for (let i=count; i>0; i--) {
    const problem = {};
    let nums;
    const operation = operations[randInt(1, 0, operations.length-1)];
    switch (operation) {
      case "add": 
        nums = randInt(2, 0, 999);
        problem.problem = `${nums[0]} + ${nums[1]}`;
        problem.solution = nums[0] + nums[1];
        break;
      case "sub": 
        nums = randInt(2, 0, 999);
        problem.problem = `${nums[0]} - ${nums[1]}`;
        problem.solution = nums[0] - nums[1];
        break;
      case "mult":
        nums = randInt(2);
        problem.problem = `${nums[0]} * ${nums[1]}`;
        problem.solution = nums[0] * nums[1];
        break;
      case "div":
        nums = randInt(2);
        problem.problem = `${nums[0]} / ${nums[1]}`;
        problem.solution = Math.round((nums[0] / nums[1]) * 100) / 100;
        break;
      default:
        let num1 = randInt(1, 0, 15);
        let num2 = randInt(1, 0, 6);
        problem.problem = `${num1}^${num2}`;
        problem.solution = Math.pow(num1, num2);
    }
    problems[`problem${i}`] = problem;
  }
  res.send({operations: operations, problems: problems});
});

module.exports = router;
