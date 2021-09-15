var Plotly = require('plotly.js-dist-min')

var cnt = 0;
var interval = 20
const pressure_reading = document.getElementById("pressure");
const altitude_reading = document.getElementById("altitude");
const temperature_bmp = document.getElementById("temperature-bmp")
const luminosity = document.getElementById("luminosity")
const humidity = document.getElementById("humidity")
const temperature_dht = document.getElementById("temperature-dht")
const methane = document.getElementById("methane")
const ammonia = document.getElementById("ammonia")
const moisture = document.getElementById("moisture")
const acc_x = document.getElementById("acc_x")
const acc_y = document.getElementById("acc_y")
const acc_z = document.getElementById("acc_z")
const av_x = document.getElementById("av_x")
const av_y = document.getElementById("av_y")
const av_z = document.getElementById("av_z")
const yaw = document.getElementById("yaw")
const pitch = document.getElementById("pitch")
const roll = document.getElementById("roll")

function getPressureData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getAltitudeData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getTemperatureBMPData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getLuminosityData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getHumidityData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getTemperatureDHTData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getMethaneData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getAmmoniaData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getMoistureData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getAcc_xData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getAcc_yData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getAcc_zData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getAV_xData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getAV_yData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getAV_zData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getYawData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getPitchData(){
    return parseFloat(Math.random()).toFixed(2);
}
function getRollData(){
    return parseFloat(Math.random()).toFixed(2);
}
var layout_pressure = {
    width: 340,
    height: 350,
    paper_bgcolor: "rgba(22, 22, 22, 1)",
    plot_bgcolor: "rgba(22, 22, 22, 1)",
    font: {
        color: "#fff"
    },
    colorway: ["#019E66"],
    title: "Pressure Variation", 
    xaxis: {
        title: "Time(s)",
        linecolor: "#fff",
        linewidth: 2
    }, 
    yaxis: {
        title: "Pressure(Pa)", 
        linecolor: "#fff",
        linewidth: 2
    }
};
var layout_altitude = {
    width: 340,
    height: 350,
    paper_bgcolor: "rgba(22, 22, 22, 1)",
    plot_bgcolor: "rgba(22, 22, 22, 1)",
    font: {
        color: "#fff"
    },
    colorway: ["#019E66"],
    title: "Altitude Variation", 
    xaxis: {
        title: "Time(s)",
        linecolor: "#fff",
        linewidth: 2
    }, 
    yaxis: {
        title: "Altitude(m)", 
        linecolor: "#fff",
        linewidth: 2
    }
};
var layout_temperature_bmp = {
    width: 340,
    height: 350,
    paper_bgcolor: "rgba(22, 22, 22, 1)",
    plot_bgcolor: "rgba(22, 22, 22, 1)",
    font: {
        color: "#fff"
    },
    colorway: ["#019E66"],
    title: "Temperature-BMP Variation", 
    xaxis: {
        title: "Time(s)",
        linecolor: "#fff",
        linewidth: 2
    }, 
    yaxis: {
        title: "Temperature(Celsius)", 
        linecolor: "#fff",
        linewidth: 2
    }
};
var layout_luminosity = {
    width: 340,
    height: 350,
    paper_bgcolor: "rgba(22, 22, 22, 1)",
    plot_bgcolor: "rgba(22, 22, 22, 1)",
    font: {
        color: "#fff"
    },
    colorway: ["#019E66"],
    title: "Luminosity Variation", 
    xaxis: {
        title: "Time(s)",
        linecolor: "#fff",
        linewidth: 2
    }, 
    yaxis: {
        title: "Luminosity(Lumins)", 
        linecolor: "#fff",
        linewidth: 2
    }
};
var layout_humidity = {
    width: 340,
    height: 350,
    paper_bgcolor: "rgba(22, 22, 22, 1)",
    plot_bgcolor: "rgba(22, 22, 22, 1)",
    font: {
        color: "#fff"
    },
    colorway: ["#019E66"],
    title: "Humidity Variation", 
    xaxis: {
        title: "Time(s)",
        linecolor: "#fff",
        linewidth: 2
    }, 
    yaxis: {
        title: "Humidity(%)", 
        linecolor: "#fff",
        linewidth: 2
    }
};
var layout_temperature_dht = {
    width: 340,
    height: 350,
    paper_bgcolor: "rgba(22, 22, 22, 1)",
    plot_bgcolor: "rgba(22, 22, 22, 1)",
    font: {
        color: "#fff"
    },
    colorway: ["#019E66"],
    title: "Temperature-DHT Variation", 
    xaxis: {
        title: "Time(s)",
        linecolor: "#fff",
        linewidth: 2
    }, 
    yaxis: {
        title: "Temperature(Celsius)", 
        linecolor: "#fff",
        linewidth: 2
    }
};
var layout_methane = {
    width: 340,
    height: 350,
    paper_bgcolor: "rgba(22, 22, 22, 1)",
    plot_bgcolor: "rgba(22, 22, 22, 1)",
    font: {
        color: "#fff"
    },
    colorway: ["#019E66"],
    title: "Methane Variation", 
    xaxis: {
        title: "Time(s)",
        linecolor: "#fff",
        linewidth: 2
    }, 
    yaxis: {
        title: "Methane(PPM)", 
        linecolor: "#fff",
        linewidth: 2
    }
};
var layout_ammonia = {
    width: 340,
    height: 350,
    paper_bgcolor: "rgba(22, 22, 22, 1)",
    plot_bgcolor: "rgba(22, 22, 22, 1)",
    font: {
        color: "#fff"
    },
    colorway: ["#019E66"],
    title: "Ammonia Variation", 
    xaxis: {
        title: "Time(s)",
        linecolor: "#fff",
        linewidth: 2
    }, 
    yaxis: {
        title: "Ammonia(PPM)", 
        linecolor: "#fff",
        linewidth: 2
    }
};
var layout_moisture = {
    width: 340,
    height: 350,
    paper_bgcolor: "rgba(22, 22, 22, 1)",
    plot_bgcolor: "rgba(22, 22, 22, 1)",
    font: {
        color: "#fff"
    },
    colorway: ["#019E66"],
    title: "Moisture Variation", 
    xaxis: {
        title: "Time(s)",
        linecolor: "#fff",
        linewidth: 2
    }, 
    yaxis: {
        title: "Moisture(%)", 
        linecolor: "#fff",
        linewidth: 2
    }
};
var layout_acc = {
    width: 500,
    height: 500,
    paper_bgcolor: "rgba(22, 22, 22, 1)",
    plot_bgcolor: "rgba(22, 22, 22, 1)",
    font: {
        color: "#fff"
    },
    colorway: ["#019E66", "#fff", "#000"],
    title: "Linear Acceleration Variation", 
    xaxis: {
        title: "Time(s)",
        linecolor: "#fff",
        linewidth: 2
    }, 
    yaxis: {
        title: "Acceleration(m/s^2)", 
        linecolor: "#fff",
        linewidth: 2
    }
};
var layout_av = {
    width: 500,
    height: 500,
    paper_bgcolor: "rgba(22, 22, 22, 1)",
    plot_bgcolor: "rgba(22, 22, 22, 1)",
    font: {
        color: "#fff"
    },
    colorway: ["#019E66", "#fff", "#000"],
    title: "Angular Velocity Variation", 
    xaxis: {
        title: "Time(s)",
        linecolor: "#fff",
        linewidth: 2
    }, 
    yaxis: {
        title: "Angular Velocity(rad/s)", 
        linecolor: "#fff",
        linewidth: 2
    }
};
var layout_ypr = {
    width: 500,
    height: 500,
    paper_bgcolor: "rgba(22, 22, 22, 1)",
    plot_bgcolor: "rgba(22, 22, 22, 1)",
    font: {
        color: "#fff"
    },
    colorway: ["#019E66", "#fff", "#000"],
    title: "Yaw Pitch Roll Variation", 
    xaxis: {
        title: "Time(s)",
        linecolor: "#fff",
        linewidth: 2
    }, 
    yaxis: {
        title: "YPR(rad)", 
        linecolor: "#fff",
        linewidth: 2
    }
};
Plotly.newPlot("pressure-graph", [{
    y:[getPressureData()], 
    type: 'line'
}], layout_pressure);

Plotly.newPlot("altitude-graph", [{
    y:[getAltitudeData()], 
    type: 'line'
}], layout_altitude);

Plotly.newPlot("temperature-bmp-graph", [{
    y:[getTemperatureBMPData()], 
    type: 'line'
}], layout_temperature_bmp);

Plotly.newPlot("luminosity-graph", [{
    y:[getLuminosityData()], 
    type: 'line'
}], layout_luminosity);

Plotly.newPlot("humidity-graph", [{
    y:[getHumidityData()], 
    type: 'line'
}], layout_humidity);

Plotly.newPlot("temperature-dht-graph", [{
    y:[getTemperatureDHTData()], 
    type: 'line'
}], layout_temperature_dht);

Plotly.newPlot("methane-graph", [{
    y:[getMethaneData()], 
    type: 'line'
}], layout_methane);

Plotly.newPlot("ammonia-graph", [{
    y:[getAmmoniaData()], 
    type: 'line'
}], layout_ammonia);

Plotly.newPlot("moisture-graph", [{
    y:[getMoistureData()], 
    type: 'line'
}], layout_moisture);

Plotly.newPlot("acc-graph", [{
    y: [1, 2, 3].map(getAcc_xData),
    name: "X", 
    mode: 'lines', 
    line: {color : "#fff"}
}, {
    y: [1, 2].map(getAcc_yData),
    name: "Y", 
    mode: 'lines',
    line: {color : "#000" }
}, {
    y: [1].map(getAcc_zData),
    name: "Z", 
    mode: 'lines',
    line: {color : "#019E66"}
}] , layout_acc);

Plotly.newPlot("av-graph", [{
    y: [1, 2, 3].map(getAV_xData),
    name: "X", 
    mode: 'lines', 
    line: {color : "#fff"}
}, {
    y: [1, 2].map(getAV_yData),
    name: "Y", 
    mode: 'lines',
    line: {color : "#000" }
}, {
    y: [1].map(getAV_zData),
    name: "Z", 
    mode: 'lines',
    line: {color : "#019E66"}
}] , layout_av);

Plotly.newPlot("ypr-graph", [{
    y: [1, 2, 3].map(getYawData),
    name: "X", 
    mode: 'lines', 
    line: {color : "#fff"}
}, {
    y: [1, 2].map(getPitchData),
    name: "Y", 
    mode: 'lines',
    line: {color : "#000" }
}, {
    y: [1].map(getRollData),
    name: "Z", 
    mode: 'lines',
    line: {color : "#019E66"}
}] , layout_ypr);

setInterval(function(){
    cnt++;
    var p = getPressureData()
    Plotly.extendTraces("pressure-graph", {y:[[p]]}, [0]);
    pressure_reading.innerHTML = p;
    var a = getAltitudeData()
    Plotly.extendTraces("altitude-graph", {y:[[a]]}, [0]);
    altitude_reading.innerHTML = a;
    var t_bmp = getTemperatureBMPData()
    Plotly.extendTraces("temperature-bmp-graph", {y:[[t_bmp]]}, [0]);
    temperature_bmp.innerHTML = t_bmp;
    var l = getLuminosityData()
    Plotly.extendTraces("luminosity-graph", {y:[[l]]}, [0]);
    luminosity.innerHTML = l;
    var h = getHumidityData()
    Plotly.extendTraces("humidity-graph", {y:[[h]]}, [0]);
    humidity.innerHTML = h;
    var t_dht = getTemperatureDHTData()
    Plotly.extendTraces("temperature-dht-graph", {y:[[t_dht]]}, [0]);
    temperature_dht.innerHTML = t_dht;
    var m = getMethaneData()
    Plotly.extendTraces("methane-graph", {y:[[m]]}, [0]);
    methane.innerHTML = m;
    var am = getAmmoniaData()
    Plotly.extendTraces("ammonia-graph", {y:[[am]]}, [0]);
    ammonia.innerHTML = am;
    var mo = getMoistureData()
    Plotly.extendTraces("moisture-graph", {y:[[mo]]}, [0]);
    moisture.innerHTML = mo;
    var accx = getAcc_xData()
    var accy = getAcc_yData()
    var accz = getAcc_zData()
    Plotly.extendTraces("acc-graph", {
        y: [[accx], [accy], [accz]]
    }, [0, 1, 2]);
    acc_x.innerHTML = accx;
    acc_y.innerHTML = accy;
    acc_z.innerHTML = accz;
    var avx = getAV_xData()
    var avy = getAV_yData()
    var avz = getAV_zData()
    Plotly.extendTraces("av-graph", {
        y: [[avx], [avy], [avz]]
    }, [0, 1, 2]);
    av_x.innerHTML = avx;
    av_y.innerHTML = avy;
    av_z.innerHTML = avz;
    var Yaw = getYawData()
    var Pitch = getPitchData()
    var Roll = getRollData()
    Plotly.extendTraces("ypr-graph", {
        y: [[Yaw], [Pitch], [Roll]]
    }, [0, 1, 2]);
    yaw.innerHTML = Yaw;
    pitch.innerHTML = Pitch;
    roll.innerHTML = Roll;
    if (cnt > interval){
        Plotly.relayout("pressure-graph", {
            xaxis: {
                range: [cnt-interval, cnt],
                title: "Time(s)",
                linecolor: "#fff",
                linewidth: 2
            }
        });
        Plotly.relayout("altitude-graph", {
            xaxis: {
                range: [cnt-interval, cnt],
                title: "Time(s)",
                linecolor: "#fff",
                linewidth: 2
            }
        });
        Plotly.relayout("temperature-bmp-graph", {
            xaxis: {
                range: [cnt-interval, cnt],
                title: "Time(s)",
                linecolor: "#fff",
                linewidth: 2
            }
        });
        Plotly.relayout("luminosity-graph", {
            xaxis: {
                range: [cnt-interval, cnt],
                title: "Time(s)",
                linecolor: "#fff",
                linewidth: 2
            }
        });
        Plotly.relayout("humidity-graph", {
            xaxis: {
                range: [cnt-interval, cnt],
                title: "Time(s)",
                linecolor: "#fff",
                linewidth: 2
            }
        });
        Plotly.relayout("temperature-dht-graph", {
            xaxis: {
                range: [cnt-interval, cnt],
                title: "Time(s)",
                linecolor: "#fff",
                linewidth: 2
            }
        });
        Plotly.relayout("methane-graph", {
            xaxis: {
                range: [cnt-interval, cnt],
                title: "Time(s)",
                linecolor: "#fff",
                linewidth: 2
            }
        });
        Plotly.relayout("ammonia-graph", {
            xaxis: {
                range: [cnt-interval, cnt],
                title: "Time(s)",
                linecolor: "#fff",
                linewidth: 2
            }
        });
        Plotly.relayout("moisture-graph", {
            xaxis: {
                range: [cnt-interval, cnt],
                title: "Time(s)",
                linecolor: "#fff",
                linewidth: 2
            }
        });
        Plotly.relayout("acc-graph", {
            xaxis: {
                range: [cnt-interval, cnt],
                title: "Time(s)",
                linecolor: "#fff",
                linewidth: 2
            }
        });
        Plotly.relayout("av-graph", {
            xaxis: {
                range: [cnt-interval, cnt],
                title: "Time(s)",
                linecolor: "#fff",
                linewidth: 2
            }
        });
        Plotly.relayout("ypr-graph", {
            xaxis: {
                range: [cnt-interval, cnt],
                title: "Time(s)",
                linecolor: "#fff",
                linewidth: 2
            }
        });
    }
}, 200);