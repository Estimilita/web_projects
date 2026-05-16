import { useState, useEffect } from "react";
import "./App.css";
import { evaluate } from "mathjs";

function App() {
  const buttons = [
    { label: "A/C", type: "reset" },
    { label: "X", type: "clear" },
    { label: "!", type: "character" },
    { label: "/", type: "character" },
    { label: 7, type: "character" },
    { label: 8, type: "character" },
    { label: 9, type: "character" },
    { label: "*", type: "character" },
    { label: 4, type: "character" },
    { label: 5, type: "character" },
    { label: 6, type: "character" },
    { label: "-", type: "character" },
    { label: 1, type: "character" },
    { label: 2, type: "character" },
    { label: 3, type: "character" },
    { label: "+", type: "character" },
    { label: "^", type: "character" },
    { label: 0, type: "character" },
    { label: ".", type: "character" },
    { label: "=", type: "equate" },
  ];

  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("");
  const [isFinal, setIsFinal] = useState(false);

  useEffect(() => {
    if (expression === "") {
       setResult("");
      return;
    }
      try {
        const updatedExpression = evaluate(expression);
        setResult(updatedExpression.toString());
      } catch {
        // do nothing
      }
    }, [expression]);

  function handleClick(item) {
    if (item.type === "character") {
      const newExpression = `${expression}${item.label}`;
      setExpression(newExpression);
      setIsFinal(false);
    }

    if (item.type === "equate") {
      setExpression(result);
      setIsFinal(true);
    }
    if (item.type === "reset") {
      setExpression("");
      setResult("");
      setIsFinal(false);
    }

    if (item.type === "clear") {
      setExpression(expression.slice(0, -1));
      return;
    }
  }

  return (
    <div>
      <h1>Calculator App</h1>
      <div className="screen">
        {isFinal ? (<p className="result">{result}</p>) :(<div>
          <p>{expression}</p>
          <p>{result}</p>
        </div>) }
        
      </div>
      <div className="board">
        {buttons.map((item, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(item)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
