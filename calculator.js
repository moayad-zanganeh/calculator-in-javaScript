let inputUser = document
  .getElementById("inp")
  .addEventListener("keydown", press);
const numbers = document.querySelectorAll(".number");
const valueOperation = document.querySelectorAll(".operation");
let array = [];

function checkIsInteger(value) {
  return (value / 2 || value / 2 === 0) && value.toString().indexOf(".") === -1;
}

function press(e) {
  if (
    e.key !== "+" &&
    e.key !== "-" &&
    e.key !== "/" &&
    e.key !== "*" &&
    e.key !== "Enter" &&
    e.key !== "Backspace" &&
    !/[0-9]/.test(e.key)
  ) {
    e.preventDefault();
    return;
  }
  let value = e.target.value;
  let lastCharacter = value.charAt(value.length - 1);
  let isLastCharOp =
    lastCharacter === "+" ||
    lastCharacter === "-" ||
    lastCharacter === "/" ||
    lastCharacter === "*" ||
    value === "";

  if (
    isLastCharOp &&
    (e.key === "+" ||
      e.key === "-" ||
      e.key === "*" ||
      e.key === "/" ||
      e.key === "Enter")
  ) {
    e.preventDefault();
    return;
  }

  let lastArrayIndex = array[array.length - 1];

  if (checkIsInteger(lastArrayIndex) && checkIsInteger(e.key)) {
    array[array.length - 1] = array[array.length - 1].concat(e.key);
    return;
  } else if (e.key !== "Backspace") {
    array.push(e.key);
  } else if (e.key === "Backspace") {
    if (
      (lastArrayIndex === isLastCharOp &&
        (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")) ||
      lastArrayIndex.length === 1
    ) {
      array.pop();
    } 

  }
  if (e.key === "Enter") {
    array.pop()
    enter(array, e);
  }
}

function enter(array, e) {
  console.log(array);
  e.preventDefault();
  let i = 0;
  while (array.filter((x) => x === "*").length) {   //array=["1","+","2","*","2","-","4","/","2"]
    let x = array.indexOf("*");  // array.indexOf("*") = 3 
    let b = array[x - 1] * array[x + 1];  // b = array[2] * array[4]
    array[x - 1] = "_"; // array[2] = 2 , array=["1","+","_","*","2","-","4","/","2"]
    array[x + 1] = "_"; // array[4] = 2 , array=["1","+","_","*","_","-","4","/","2"]
    array[x] = b; // array[3] = 4 , array=["1","+","_",4,"_","-","4","/","2"]
    array = array.filter((x) => x !== "_"); // array=["1","+",4,"-","4","/","2"]
    console.log(array);
    i++;
  }
  while (array.filter((x) => x === "/").length) {   // array=["1","+",4,"-","4","/","2"]
    let x = array.indexOf("/"); // array.indexOf("/") = 5
    let b = array[x - 1] / array[x + 1]; // b = array[4] * array[6]
    array[x - 1] = "_"; // array[4] = 4 , array=["1","+",4,"-","_","/","2"]
    array[x + 1] = "_"; // array[6] = 2 , array=["1","+",4,"-","_","/","_"]
    array[x] = b; // array[5] = 2 , array=["1","+",4,"-","_",2,"_"]
    array = array.filter((x) => x !== "_"); // array=["1","+",4,"-",2]
    console.log(array);
    i++;
  }
  while (array.filter((x) => x === "-").length) { // array=["1","+",4,"-",2]
    let x = array.indexOf("-"); // array.indexOf("-") = 3
    let b = array[x - 1] - array[x + 1];  // b = array[2] * array[4]
    array[x - 1] = "_"; // array[2] = 4 , array=["1","+","_","-",2]
    array[x + 1] = "_"; // array[4] = 2 , array=["1","+","_","-","_"]
    array[x] = b; // array[3] = 2 array=["1","+","_",2,"_"]
    array = array.filter((x) => x !== "_"); // array=["1","+",2]
    console.log(array);
    i++;
  }
  while (array.filter((x) => x === "+").length) { // array=["1","+",2]
    let x = array.indexOf("+"); // array.indexOf("+") = 1
    let b = parseFloat(array[x - 1])  + parseFloat(array[x + 1]);  // b = array[0] * array[2]
    array[x - 1] = "_"; // array[0] = 1 , array=["_","+",2]
    array[x + 1] = "_"; // array[2] = 2 , array=["_","+","_"]
    array[x] = b; // array[1] = 3
    array = array.filter((x) => x !== "_"); // array =[3]
    console.log(array);
    i++;
    
  }
  document.getElementById("inp").value = array.join("") //3
}


