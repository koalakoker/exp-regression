let graph =  { x: 800, y:600 };
let offset = { x: 0, y: 25};
let factor = { x: graph.x / 100, y: graph.y / 40};
let extimated = [];

function setup() {
  createCanvas(graph.x, graph.y);
  createFunction(b1, b2, b3);
}

function createFunction(b1, b2, b3) {
  for (let x = 0; x < data.length; x++ )
  {
    extimated.push({
      x: x, y: b1 + b2 * (1-exp(-x / b3))
    })
  }
}

function drawCurve(curve) {
  curve.forEach(element => {
    vertex((element.x - offset.x) * factor.x,
            graph.y - ((element.y - offset.y) * factor.y));
  });
}

function draw() {
  background(220);
  strokeWeight(3);
  noFill();
  stroke('black');
  beginShape();
  drawCurve(data);
  endShape();
  strokeWeight(5);
  beginShape(POINTS);
  drawCurve(data);
  endShape();
  stroke('red');
  beginShape();
  drawCurve(extimated);
  endShape();
}