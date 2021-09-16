let zoom = 600/800;
let graph =  { x: 800 * zoom, y:600 * zoom };
let offset = { x: 0, y: 25};
let factor = { x: graph.x / 100, y: graph.y / 30};
let data = [];
let real = [];
let extimated = [];

function setup() {
  createCanvas(graph.x, graph.y);
  
  const b0 = Math.floor(Math.random() * 15) + 25;
  const b1 = Math.floor(Math.random() * 10) + 10;
  const b2 = Math.floor(Math.random() * 20) + 10;
  let b = [b0,b1,b2];
  const finalValue = b0 + b1;
  const tau = b2;

  nPoint = 50;
  noise = 0.7;
  data = createFunction(b, nPoint, noise);

  real = createFunction(b, 100, 0);
  
  b = expRegression(data, 10);
  const extFinalValue = b[0] + b[1];
  const extTau = b[2];
  extimated = createFunction(b);

  const error = (Math.abs(finalValue-extFinalValue) / finalValue) * 100;
  const tauError = (Math.abs(tau - extTau) / tau) * 100;
  console.log(finalValue, extFinalValue, error);
  console.log(tau, extTau, tauError);
}

function createFunction(b, length = 100, randomize = 0) {
  let f = [];
  for (let x = 0; x < length; x++ )
  {
    let y = b[0] + b[1] * (1 - exp(-x / b[2]));
    let r = (Math.random() - 0.5) * randomize;
    f.push({
      x: x, y: y + r
    })
  }
  return f;
}

function drawCurvePoints(curve, color, weight, type = null) {
  stroke(color);
  strokeWeight(weight);
  beginShape(type);
  curve.forEach(element => {
    vertex((element.x - offset.x) * factor.x,
            graph.y - ((element.y - offset.y) * factor.y));
  });
  endShape();
}

function draw() {
  //background(220);
  noFill();
  
  drawCurvePoints(data, 'black', 3);
  drawCurvePoints(data, 'black', 5, POINTS);

  drawCurvePoints(real, 'green', 2);
  
  drawCurvePoints(extimated, 'red', 3);
}