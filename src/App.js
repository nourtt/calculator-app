
import './App.css';
import Display from './Display';
import Button from './Button';
import buttons from './buttons';
import {  useState } from 'react';
function App() {
  const [value, changeValue] = useState("0");
  const [firstOperand, changeFirst] = useState(null);
  const [secondOperand, changeSecond] = useState(null);
  const [operator, changeOperator] = useState(null);
  const [isOperatorSet, setIsOperatorSet] = useState(false);
  const [isResultDisplayed, setIsResultDisplayed] = useState(false);
  const [isChained, setIsChained] = useState(false);
  const [memory, changeMemory] = useState(null);
  function handleNumber(num){
    if (isResultDisplayed && !isChained){
      changeFirst(num);
      changeSecond(null);
      changeValue(num);
      changeOperator(null);
      setIsOperatorSet(false);
      setIsResultDisplayed(false);
    } else{
      if (value === "0"){
        if (isOperatorSet === false){
          changeFirst(num);
        } else{
          changeSecond(num);
        }
        changeValue(num);
      } else {
        if (isOperatorSet === false){
          changeFirst((prevValue) => {
            return prevValue + num;
          });
        } else{
          changeSecond((prevValue) => {
            if (prevValue === null){
              return num;
            }
            return prevValue + num;
          });
        }
        changeValue((prevValue) => {
          if (prevValue === "+" || prevValue === "-" || prevValue === "*" || prevValue === "/"){
            return num;
          }
          return prevValue + num;
        })
      }
    }
  }
  function calculate(num1 = parseFloat(firstOperand), num2 = parseFloat(secondOperand)){
    
    switch (operator) {
      case "+":
        return (num1 + num2).toString();
      case "-":
        return (num1 - num2).toString();
      case "*":
        return (num1 * num2).toString();
      case "/":
        return (num1 / num2).toString();
      default:
        return "0";
    }
  }
  function handleOperator(op){
    changeOperator(op);
    changeValue(op);
    setIsOperatorSet(true);
  }
  function handleEqual(){
    if (secondOperand == null){
      changeSecond(firstOperand);
      const result = calculate(parseFloat(firstOperand), parseFloat(firstOperand));
      changeValue(result);
      setIsResultDisplayed(true);
      changeFirst(result);
      changeSecond(null);
      changeOperator(null);
      setIsOperatorSet(false);
      setIsChained(true);
    } else {
      const result = calculate();
      changeValue(result);
      setIsResultDisplayed(true);
      changeFirst(result);
      changeSecond(null);
      changeOperator(null);
      setIsOperatorSet(false);
      setIsChained(true);
    }
    
  }
  function handleErase(name){
    if (name === "AC"){
      changeValue("0");
      changeFirst(null);
      changeSecond(null);
      changeOperator(null);
      setIsOperatorSet(false);
      setIsResultDisplayed(false);
      setIsChained(false);
    } else {
      if (secondOperand){
        changeSecond(null);
        changeValue("0");
      } else if (firstOperand){
        changeFirst(null);
        changeValue("0");
      }
    }
    
  }
  function handleMemory(name){
    switch (name) {
      case "MS":
        return changeMemory(value)
      case "MC":
        return changeMemory(null);
      case "M+":
        return changeMemory((prevValue) => {
          return (parseFloat(prevValue) + parseFloat(value)).toString();
        })
      case "M-":
        return changeMemory((prevValue) => {
          return (parseFloat(prevValue) - parseFloat(value)).toString();
        })
      case "MR":
        if (memory === null){
          return handleNumber(0);
        } else{
          changeValue(null);
          return handleNumber(memory);
        }
      default:
        break;
    }
  }
  function handleClick (name, type){
    if (type === "number"){
      handleNumber(name);
    } else if (type === "operator"){
      handleOperator(name);
    } else if (type === "equalizer"){
      handleEqual();
    } else if (type === "eraser"){
      handleErase(name);
    } else if (type === "memory"){
      handleMemory(name);
    }
  }
  return (
    <div className="App">
        <div id="container">
          <Display display={value}/>
          {buttons.map((button) => {
            return <Button type={button.type} click={handleClick} key={button.id} name={button.name} />
          })}
        </div>
    </div>
  );
}

export default App;
