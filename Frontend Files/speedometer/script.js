const gaugeElement = document.querySelector(".gauge");

function setGaugeValue(gauge, localValue) {

  if(localValue < 0)
  {
    document.getElementById("fill__hider").style.left = "50%";
    document.getElementById("fill").style.background = "#1a73e8";
  }
  
  gauge.querySelector(".gauge__fill").style.transform = `rotate(${ 0.25 + (localValue / 4) }turn)`;
  
  gauge.querySelector(".gauge__cover").textContent = `${value}`;
}

value = -1;

  if(value < 0 && value >= -1)
{

  setGaugeValue(gaugeElement,(value-2));
}
if(value >= 0 && value <= 1)
{
  setGaugeValue(gaugeElement,value);
}

