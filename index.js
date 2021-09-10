var matrix = require('matrix-js');

// var a = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
// var A = matrix(a);
// var B = matrix(A.trans());
// console.log(A.prod(B)); // returns [[4, 6, 8], [10, 12, 14], [16, 18, 20]]



const data = require('./data.json');
const jacob = [];
const dy = [];
let b1 = 35;
let b2 = 15;
let b3 = 22;
data.forEach(element => {
  jacob.push(Jacob(element.x, b2, b3));
  dy.push(Y(element.x, element.y, b1, b2, b3));
});

const J = matrix(jacob);
const JT = matrix(J.trans());
const A = matrix(JT.prod(J));
const AInv = matrix(A.inv());

console.log(matrix(dy).trans());
// const DY = matrix(dy);
// const JY = matrix(J.prod(dy));
// console.log(JY());
// const dB = AInv.prod(JY);

//console.log(dB);

function Jacob(x, b2, b3 ) {
  const jacob = [];
  const exp = Math.exp(-x / b3);
  jacob.push(1);
  jacob.push(1-exp);
  jacob.push(-(b2*x*exp)/(b3*b3));
  return jacob;
}

function f(x, b1, b2, b3) {
  const exp = Math.exp(-x / b3);
  return b1 + (b2 * (1 - exp)); 
}

function Y(x, y, b1, b2, b3) {
  const dy = [];
  return(y - f(x, b1, b2, b3));
}