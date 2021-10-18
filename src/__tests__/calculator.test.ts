import calculator from "../calculator";

// each of the objects in the dataset array has the pieces of a math problem.
// "add": x + y
// "subtract": x - y
// "multiply": x * y
// "divide": x / y
let dataset = [
  { x: 5, y: 10, method: "add" },
  { x: 5, y: 10, method: "subtract" },
  { x: 5, y: 10, method: "multiply" },
  { x: 5, y: 10, method: "divide" },
  { x: -12, y: 10000, method: "add" },
  { x: -12, y: 10000, method: "subtract" },
  { x: -12, y: 10000, method: "multiply" },
  { x: -12, y: 10000, method: "divide" },
  { x: 42, y: 0, method: "add" },
  { x: 42, y: 0, method: "subtract" },
  { x: 42, y: 0, method: "multiply" },
  { x: 42, y: 0, method: "divide" },
  { x: 81, y: 227, method: "add" },
  { x: 81, y: 227, method: "subtract" },
  { x: 81, y: 227, method: "multiply" },
  { x: 81, y: 227, method: "divide" },
];

// Test itirates through the dataset and runs calculation using the calculator class and manual calculation and compares the values
 describe("Calculator", () => {
  dataset.forEach(data => {test(`Calculating ${data.x} ${data.method} ${data.y}`, () => {expect(doCalculation(data.method, data.x, data.y)).toEqual(manualCalculation(data.method, data.x, data.y))})});
});

// Calculation between x and y using the calcultor class
function doCalculation(method: string, x: number, y: number): number{
  switch(method) {
    case "add":
      return calculator.add(x, y);
    case "subtract":
      return calculator.subtract(x, y);
    case "multiply":
      return calculator.multiply(x, y);
    case "divide":
      return calculator.divide(x, y);
  }
}

// Calcultion between x and y using built in computer math
function manualCalculation(method: string, x: number, y: number): number{
  switch(method) {
    case "add":
      return x+y
    case "subtract":
      return x-y;
    case "multiply":
      return x*y;
    case "divide":
      return x/y;
  }
}