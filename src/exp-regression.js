var matrix = require('matrix-js');
let data = [];

if (nodeRun()) {
  data = require('../data.json');
  expRegression(data, 4);
} else {
  window.expRegression = expRegression;
}

function expRegression(data, iteration = 10) {
  
  let minY = data[0].y;
  let maxY = data[data.length - 1].y;
  let b = [minY, maxY - minY, 20];
  if (nodeRun()) {
    console.log(b);
  }
  
  for (let i = 0; i < iteration; i++) {
    let dB = iterate(b, data);
    for (let index = 0; index < b.length; index++) {
      b[index] += dB[index];
    }
    if (nodeRun()) {
      console.log(paramsToString(b) + ' ' + paramsToString(dB, 6));
    }
  }
  
  return b; 
}

function iterate(b, data) {
  const jacob = [];
  const dy = [];
  
  data.forEach(element => {
    jacob.push(Jacob(element.x, b));
    dy.push(Y(element.x, element.y, b));
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


function Jacob(x, b ) {
  const jacob = [];
  const exp = Math.exp(-x / b[2]);
  jacob.push(1);
  jacob.push(1-exp);
  jacob.push(-(b[1]*x*exp)/(b[2]*b[2]));
  return jacob;
}

function f(x, b) {
  const exp = Math.exp(-x / b[2]);
  return b[0] + (b[1] * (1 - exp)); 
}

function Y(x, y, b) {
  const dy = [];
  return(y - f(x, b));
}

function nodeRun() { return (typeof window === 'undefined') };

function paramsToString(b, decimal = 3) {
  let out = '[';
  b.forEach((element, index) => {
    out += element.toFixed(decimal);
    if (index < b.length - 1) {
      out += ', ';
    }
  });
  out += ']';
  return out;
}