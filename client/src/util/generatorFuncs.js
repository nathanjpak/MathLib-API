import axios from "axios";

export const genArith = (count, updateState) => {
  let problems = [];
  let queryString = "?";
  if (count) queryString = `${queryString}count=${count}`
  axios({
    method: "get",
    url: `http://localhost:8000/gen/arith${queryString}`,
  })
    .then((response) => {
      problems = response.data;
      updateState(problems);
    })
}

export const genLinear = (count, updateState) => {
  let problems = [];
  let queryString = "?";
  if (count) queryString = `${queryString}count=${count}`
  axios({
    method: "get",
    url: `http://localhost:8000/gen/alg/linear${queryString}`,
  })
    .then((response) => {
      problems = response.data;
      updateState(problems);
    })
}
