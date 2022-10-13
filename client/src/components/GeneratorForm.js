import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { MathJax } from "better-react-mathjax";

const GeneratorForm = () => {
  const { register, handleSubmit } = useForm();

  const [problems, setProblems] = useState([]);
  // const addProblem = (problem) => {
  //   const newProblems = [...problems];
  //   newProblems.push(problem);
  //   setProblems(newProblems);
  // }

  const onSubmit = (data) => {
    console.log(data);
    const problemsCount = data.problemsCount;
    let newProblems = [];
    for (let i=0; i<problemsCount; i++) {
      let problem={};
      axios({
        method: "get",
        url: "localhost:8000/gen/arith"
      })
        .then((response) => {
          problem = response.data;
          console.log(problem);
          newProblems.push(problem);
          // addProblem(problem);
        })
    }
    setProblems(newProblems);
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("topic")}>
        <option value="arithmetic">Arithmetic</option>
        <option value="linearEquations">Linear Equations</option>
      </select>
      <select {...register("solutions")}>
        <option value="posInts">Positive Integers</option>
        <option value="ints">Integers</option>
        <option value="nonZeroInts">Non-Zero Integers</option>
        <option value="rationals">Rational Numbers</option>
        <option value="irrationals">Irrational Numbers</option>
        <option value="reals">Real Numbers</option>
      </select>
      <input {...register("problemsCount", { min: 1, max: 100 })} type="number" placeholder="How many problems?" />
      <input type="submit"/>
    </form>
    <button onClick={() => console.log(problems)}>State</button>
    <div>
      {problems.map((problem, index) => (
        <div key={index}> 
          <h3>Problem {index+1}</h3>
          <p><MathJax>{`$${problem.expression}$`}</MathJax></p>
          <p>Solution&#40;s&#41;: {problem.answer}</p>
        </div>
      ))}
    </div>
    </>
  )
};

export default GeneratorForm;
