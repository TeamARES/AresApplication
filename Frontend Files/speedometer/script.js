var Host = require('socket.engine').host; 
var h = new Host(addr = "127.0.0.1", port = 8000);
h.start();
const gaugeElement1 = document.getElementById("gauge1")
const gaugeElement2 = document.getElementById("gauge2");
const gaugeElement3 = document.getElementById("gauge3");
const gaugeElement4 = document.getElementById("gauge4");

function setGaugeValue1(gauge, localValue, value) {

  if(localValue < 0)
  {
    document.getElementById("fill__hider1").style.left = "50%";
    document.getElementById("fill1").style.background = "#CA6F1E";
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${ 0.25 + (localValue / 4) }turn)`;
  }
  else{
    document.getElementById("fill__hider1").style.left = "0%";
    document.getElementById("fill1").style.background = "#b4c0be";
    document.getElementById("fill__hider1").style.right = "50%";
    document.getElementById("fill1").style.background = "#019E66";
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${ 0.25 + (localValue / 4) }turn)`;
  }
  
  
  gauge.querySelector(".gauge__cover").textContent = `${value}`;
}

function setGaugeValue2(gauge, localValue, value) {

  if(localValue < 0)
  {
    document.getElementById("fill__hider2").style.left = "50%";
    document.getElementById("fill2").style.background = "#CA6F1E";
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${ 0.25 + (localValue / 4) }turn)`;
  }
  else{
    document.getElementById("fill__hider2").style.left = "0%";
    document.getElementById("fill2").style.background = "#b4c0be";
    document.getElementById("fill__hider2").style.right = "50%";
    document.getElementById("fill2").style.background = "#019E66";
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${ 0.25 + (localValue / 4) }turn)`;
  }
  
  
  gauge.querySelector(".gauge__cover").textContent = `${value}`;
}

function setGaugeValue3(gauge, localValue, value) {

  if(localValue < 0)
  {
    document.getElementById("fill__hider3").style.left = "50%";
    document.getElementById("fill3").style.background = "#CA6F1E";
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${ 0.25 + (localValue / 4) }turn)`;
  }
  else{
    document.getElementById("fill__hider3").style.left = "0%";
    document.getElementById("fill3").style.background = "#b4c0be";
    document.getElementById("fill__hider3").style.right = "50%";
    document.getElementById("fill3").style.background = "#019E66";
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${ 0.25 + (localValue / 4) }turn)`;
  }
  
  
  gauge.querySelector(".gauge__cover").textContent = `${value}`;
}

function setGaugeValue4(gauge, localValue, value) {

  if(localValue < 0)
  {
    document.getElementById("fill__hider4").style.left = "50%";
    document.getElementById("fill4").style.background = "#CA6F1E";
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${ 0.25 + (localValue / 4) }turn)`;
  }
  else{
    document.getElementById("fill__hider4").style.left = "0%";
    document.getElementById("fill4").style.background = "#b4c0be";
    document.getElementById("fill__hider4").style.right = "50%";
    document.getElementById("fill4").style.background = "#019E66";
    gauge.querySelector(".gauge__fill").style.transform = `rotate(${ 0.25 + (localValue / 4) }turn)`;
  }
  
  
  gauge.querySelector(".gauge__cover").textContent = `${value}`;
}

h.on("speed-fl", (value) => {
    var original = value;
    value /= 100;
    if(value < 0 && value >= -1){

      setGaugeValue1(gaugeElement1, value - 2, original);
    }
    if(value >= 0 && value <= 1){
      setGaugeValue1(gaugeElement1, value, original);
    }
});
h.on("speed-bl", (value) => {
    var original = value;
    value /= 100;
    if(value < 0 && value >= -1){

      setGaugeValue2(gaugeElement2, value - 2, original);
    }
    if(value >= 0 && value <= 1){
      setGaugeValue2(gaugeElement2, value, original);
    }
});
h.on("speed-fr", (value) => {
    var original = value;
    value /= 100;
    if(value < 0 && value >= -1){

      setGaugeValue3(gaugeElement3, value - 2, original);
    }
    if(value >= 0 && value <= 1){
      setGaugeValue3(gaugeElement3, value, original);
    }
});
h.on("speed-br", (value) => {
   var original = value;
    value /= 100;
    if(value < 0 && value >= -1){

      setGaugeValue4(gaugeElement4, value - 2, original);
    }
    if(value >= 0 && value <= 1){
      setGaugeValue4(gaugeElement4, value, original);
    }
});

h.on("status_prop", (data) => {
  if(data > 0){
      document.getElementById("status").textContent = "Active";
      document.getElementById("status").style.color = "#019E66"
  }
  else{
      document.getElementById("status").textContent = "Inactive";
      document.getElementById("status").style.color = "red"
  }
});