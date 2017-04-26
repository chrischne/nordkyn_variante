var weather = null;
var farbton = 171;

var nrSections = 8;
var sectionAngle = 360 / nrSections;
var shortSize = 100;
var longSize = 200;
var dd = 0;
var deg = 225;


function setup() {
  createCanvas(400, 400);
  loadJSON('http://api.openweathermap.org/data/2.5/weather?q=Oslo&APPID=001b0f58045147663b1ea518d34d88b4&units=metric', gotData);

  colorMode(HSB);

}

function gotData(data) {
  weather = data;

}

function draw() {

  if (weather) {
    farbton = map(weather.main.temp, -20, 30, 0, 360);
    //speed = weather.wind.speed;
    deg = weather.wind.deg;
    console.log(weather.main.temp);
  }


  farbton = map(mouseX, 0, width, 0, 360);

  var t1 = color(farbton, 10, 78, 1);
  var t2 = color(farbton, 60, 78, 1);
  var t3 = color(farbton, 61, 40, 1);
  var t4 = color(farbton, 50, 55, 1);
  var t5 = color(farbton, 35, 78, 1);
  var t6 = color(137, 3, 87, 1);

  //ein array aus den erstellten farben. damit man unten im for loop auf die einzelnen farben zugreifen kann.
  var colors = [t1, t2, t3, t4, t5, t6, t6, t6];

  background(farbton, 10, 100, 1);
  noStroke();

  //mit einer for schlaufe über as in points.js definierte triangles array loopen.
  /* for (var i = 0; i < triangles.length; i++) {
     var t = triangles[i];
     var c = colors[i];
     fill(c);
     beginShape();
     //jedes dreieck in triangles ist wiederum ein array mit drei einträgen (ein eintrag pro punkt)
     //auch hier könnte man einen for loop machen.
     vertex(t[0].x, t[0].y);
     vertex(t[1].x, t[1].y);
     vertex(t[2].x, t[2].y);
     endShape();
   }*/


  push();
  translate(width / 2, height / 2);

  fill('red');
  ellipse(0, 0, 10, 10);

  var v = createVector(0, -1);
  var longIndex = indexFromDeg(deg);

  noFill();
  
  //schaue in der referece wie TRIANGLE_STRIP funktioniert, 
  //ist ein bisschen anderes als TRIANGLES
  beginShape(TRIANGLE_STRIP);
  for (var i = 0; i < nrSections; i++) {
    v.setMag(shortSize);

    if (i == longIndex) {
      v.setMag(longSize);
    }
    fill(colors[i]);
    vertex(v.x, v.y);
    vertex(0, 0);
    v.rotate(radians(sectionAngle));
  }
  endShape(CLOSE);

  pop();


  noLoop();
}

function indexFromDeg(deg) {
  var d = 0;

  if (deg > 337.5 && deg < 360 || deg > 0 && deg < 22.5) {
    deg = 0;
  } else if (deg > 22.5 && deg < 67.5) {
    d = 1;
  } else if (deg > 67.5 && deg < 112.5) {
    d = 2;
  } else if (deg > 112.5 && deg < 157.5) {
    d = 3;
  } else if (deg > 157.5 && deg < 202.5) {
    d = 4;
  } else if (deg > 202.5 && deg < 247.5) {
    d = 5;
  } else if (deg > 247.5 && deg < 292.5) {
    d = 6;
  } else if (deg > 292.5 && deg < 337.5) {
    d = 7;
  }

  return d;
}