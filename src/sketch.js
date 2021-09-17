let zoom = 600/800;
let graph =  { x: 800 * zoom, y:600 * zoom };
let offset = { x: 0, y: 25};
let factor = { x: graph.x / 100, y: graph.y / 40};
let data = [];
let real = [];
let extimated = [];

function newDataReceived(input) {
  const lines = input.split('\n');
  for (let line = 0; line < lines.length; line++) {
    const values = lines[line].split('\t');
    if (values.length == 2) {
      const x = parseFloat(values[0]);
      const y = parseFloat(values[1]);
      data.push({
        x: x, y: y
      })
    }
  }
  
  b = expRegression(data, 10);
  
  const extStartValue = b[0];
  const extFinalValue = b[0] + b[1];
  const extTau = b[2];
  extimated = createFunction(b);

  document.getElementById('f0').value = extStartValue;
  document.getElementById('f_inf').value = extFinalValue;
  document.getElementById('tau').value = extTau;

  var x = document.getElementById("myDIV");
  x.style.display = "block";

}

function setup() {
  createCanvas(graph.x, graph.y);
  var x = document.getElementById("myDIV");
  x.style.display = "none";
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

function test() {
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
}

function draw() {
  //background(220);
  noFill();
  
  drawCurvePoints(data, 'black', 3);
  drawCurvePoints(data, 'black', 5, POINTS);

  drawCurvePoints(real, 'green', 2);
  
  drawCurvePoints(extimated, 'red', 3);
}