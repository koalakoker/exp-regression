var matrix = require('matrix-js');
const data = require('../data.json');

let b1 = data[0].y;
let b2 = 1;
let b3 = 20;
//console.log(b1, b2, b3);

for (let i = 0; i < 10; i++) {
  let dB = iterate(b1, b2, b3);
  b1 += dB[0];
  b2 += dB[1];
  b3 += dB[2];
  //console.log(b1, b2, b3, '[', dB[0], dB[1], dB[2], ']');
}

if (typeof window !== 'undefined') {
  window.data = data;
  window.b1 = b1;
  window.b2 = b2;
  window.b3 = b3;
} else {
  console.log('executing with node');
}

function iterate(b1, b2, b3) {
  const jacob = [];
  const dy = [];
  
  data.forEach(element => {
    jacob.push(Jacob(element.x, b2, b3));
    dy.push(Y(element.x, element.y, b1, b2, b3));
  });

  const J = matrix(jacob);
  const JT = matrix(J.trans());
  const A = matrix(JT.prod(J));
  const AInv = matrix(A.inv());

  const DYT = matrix(matrix([dy]).trans());
  const JY = matrix(JT.prod(DYT));

  const dB = AInv.prod(JY);
  
  return matrix(dB).trans()[0];
}


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