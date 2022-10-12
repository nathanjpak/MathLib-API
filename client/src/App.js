import './App.css';
import MathJax from "@innodoc/react-mathjax-node";

const App = () => {
  return (
    <MathJax.Provider>
      <p>
        Inline Math:{' '}
        <MathJax.MathJaxNode displayType="inline" texCode="f(x)=x^2+b_1" />
      </p>
    </MathJax.Provider>
  );
}

export default App;
