import React, { useState } from 'react';

function App() {
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performCalculation = () => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null && !isNaN(inputValue)) {
      setFirstOperand(inputValue);
    } else if (operator && firstOperand !== null && !waitingForSecondOperand) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result); // Set result as first operand for chained operations
    }
    setWaitingForSecondOperand(true);
    setOperator(null); // Clear operator after calculation
  };

  const calculate = (firstNum, secondNum, op) => {
    switch (op) {
      case '+':
        return firstNum + secondNum;
      case '-':
        return firstNum - secondNum;
      case '*':
        return firstNum * secondNum;
      case '/':
        return firstNum / secondNum;
      default:
        return secondNum;
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null && !isNaN(inputValue)) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="calculator bg-gray-800 p-6 rounded-lg shadow-xl w-80">
        <div className="display bg-gray-700 text-white text-right p-4 mb-4 rounded-md text-3xl font-mono overflow-hidden">
          {displayValue}
        </div>

        <div className="grid grid-cols-4 gap-2">
          <button
            onClick={clearDisplay}
            className="col-span-2 p-4 text-white text-xl bg-red-500 hover:bg-red-600 rounded-md shadow-md transition-colors duration-200"
          >
            C
          </button>
          <button
            onClick={() => handleOperator('/')}
            className="p-4 text-white text-xl bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition-colors duration-200"
          >
            /
          </button>
          <button
            onClick={() => handleOperator('*')}
            className="p-4 text-white text-xl bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition-colors duration-200"
          >
            *
          </button>

          {[7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => inputDigit(num)}
              className="p-4 text-white text-xl bg-gray-600 hover:bg-gray-700 rounded-md shadow-md transition-colors duration-200"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleOperator('-')}
            className="p-4 text-white text-xl bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition-colors duration-200"
          >
            -
          </button>

          {[4, 5, 6].map((num) => (
            <button
              key={num}
              onClick={() => inputDigit(num)}
              className="p-4 text-white text-xl bg-gray-600 hover:bg-gray-700 rounded-md shadow-md transition-colors duration-200"
            >
              {num}
            </button>
          ))}
          <button
            onClick={() => handleOperator('+')}
            className="p-4 text-white text-xl bg-blue-500 hover:bg-blue-600 rounded-md shadow-md transition-colors duration-200"
          >
            +
          </button>

          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => inputDigit(num)}
              className="p-4 text-white text-xl bg-gray-600 hover:bg-gray-700 rounded-md shadow-md transition-colors duration-200"
            >
              {num}
            </button>
          ))}
          <button
            onClick={performCalculation}
            className="row-span-2 p-4 text-white text-xl bg-green-500 hover:bg-green-600 rounded-md shadow-md transition-colors duration-200 flex items-center justify-center"
          >
            =
          </button>

          <button
            onClick={() => inputDigit(0)}
            className="col-span-2 p-4 text-white text-xl bg-gray-600 hover:bg-gray-700 rounded-md shadow-md transition-colors duration-200"
          >
            0
          </button>
          <button
            onClick={inputDecimal}
            className="p-4 text-white text-xl bg-gray-600 hover:bg-gray-700 rounded-md shadow-md transition-colors duration-200"
          >
            .
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;