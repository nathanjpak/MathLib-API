import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MathJax } from "better-react-mathjax";
import { genArith, genLinear } from "../util/generatorFuncs";

const GeneratorForm = () => {
  const { register, handleSubmit } = useForm();

  const [problems, setProblems] = useState([]);

  const onSubmit = (data) => {
    console.log(data);
    const { topic, problemsCount } = data;
    switch (topic) {
      case "linearEquations":
        genLinear(problemsCount, setProblems);
        break;
      default:
        genArith(problemsCount, setProblems);
    }
  };

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <select {...register("topic")}>
        <option value="arithmetic">Arithmetic</option>
        <option value="linearEquations">Linear Equations</option>
      </select>
      {/* <select {...register("solutions")}>
        <option value="posInts">Positive Integers</option>
        <option value="ints">Integers</option>
        <option value="nonZeroInts">Non-Zero Integers</option>
        <option value="rationals">Rational Numbers</option>
        <option value="irrationals">Irrational Numbers</option>
        <option value="reals">Real Numbers</option>
      </select> */}
      <input {...register("problemsCount", { min: 1, max: 100 })} type="number" placeholder="How many problems?" />
      <input type="submit"/>
    </form>
    <button onClick={() => console.log(problems)}>State</button>
    <div>
      {problems.map((problem, index) => (
        <div key={`problem${index}`}> 
          <h3>Problem {index+1}</h3>
          <p><MathJax>{`$${problem.problem}$`}</MathJax></p>
          <p>Solution&#40;s&#41;: {problem.solution}</p>
        </div>
      ))}
    </div>
    </>
  )
};

export default GeneratorForm;
