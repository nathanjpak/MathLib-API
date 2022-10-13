import './App.css';
import { MathJaxContext, MathJax } from "better-react-mathjax";
import GeneratorForm from './components/GeneratorForm';

const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  }
};

const App = () => {
  return (
    <div>
      <MathJaxContext version={3} config={config} onError={(error) => console.log(error)}>
        <GeneratorForm />
        <MathJax>{`$2x^4 = 100$`}</MathJax>
      </MathJaxContext>
    </div>    
  );
}

export default App;
