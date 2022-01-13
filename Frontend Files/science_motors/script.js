console.log("Script initiated");
var microscope = document.getElementById("microscope");
var pump = document.getElementById('pump');
var test_tube_nozzle = document.getElementById('stepper_nozzle');
var test_tube_colour = document.getElementById('stepper_colour');
var image1 = document.getElementsByClassName('def')[0];
var image2 = document.getElementsByClassName('red')[0];
var image3 = document.getElementsByClassName('green')[0];
var image4 = document.getElementsByClassName('blue')[0];
var min1 = document.getElementsByClassName('def')[1];
var min2 = document.getElementsByClassName('red')[1];
var min3 = document.getElementsByClassName('green')[1];
var min4 = document.getElementsByClassName('blue')[1];

var sand = document.getElementById('sand');
var slit = document.getElementById('slit');
var clay = document.getElementById('clay');
var finalClassification = document.getElementById('finalSoil');
var mineralidentified = document.getElementById('mineralIdentified');
var mineralcolour = document.getElementById('mineralColour');
var streak = document.getElementById('streak');
var elements = document.getElementById('elements');

microscope.onclick = function () {
    axios({
        url: 'http://192.168.30.151:8000/capture_micro',
        method: 'GET',
        responseType: 'blob'
    }).then(async (response) => {
        console.log("Got micro response");
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'image.jpg');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        image1.src = url;
        image2.src = url;
        image3.src = url;
        image4.src = url;
    });

    /* Function for Calling backend */
    axios({
        url: 'http://192.168.30.151:8000/science?task=soil',
        method: 'GET',
        responseType: 'json'
    }).then(async (response) => {
        sand.innerHTML = response.data.sand;
        slit.innerHTML = response.data.silt;
        clay.innerHTML = response.data.clay;
        finalClassification.innerHTML = response.data.class;
    });
    


    //Use for Local Testing
    // console.log(image1);
    // console.log(image2);
    // console.log(image3);
    // console.log(image4);
    // const input = document.getElementById('alpha');
    // const url = window.URL.createObjectURL(new Blob([input.files[0]]));
    // image1.src = url;
    // image2.src = url;
    // image3.src = url;
    // image4.src = url;
};

mineral.onclick = function () {
    axios({
        url: 'http://192.168.30.151:8000/capture_micro',
        method: 'GET',
        responseType: 'blob'
    }).then(async (response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'image.jpg');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        min1.src = url;
        min2.src = url;
        min3.src = url;
        min4.src = url;
    });
    /* Function for Calling backend */
    axios({
        url: 'http://192.168.30.151:8000/science?task=mineral',
        method: 'GET',
        responseType: 'json'
    }).then(async (response) => {
        mineralcolour.innerHTML = response.data.mineralColour;
        mineralidentified.innerHTML = response.data.mineralIdentified;
        streak.innerHTML = response.data.streak;
        elements.innerHTML = response.data.elements;
    });
    // mineralcolour.innerHTML = "Brown";
    // mineralidentified.innerHTML = "Aliminium";
    // streak.innerHTML = "Black";
    // elements.innerHTML = "Al, Fe, Xe"


    //Use for Local Testing
    // console.log(image1);
    // console.log(image2);
    // console.log(image3);
    // console.log(image4);
    // const input = document.getElementById('alpha');
    // const url = window.URL.createObjectURL(new Blob([input.files[0]]));
    // min1.src = url;
    // min2.src = url;
    // min3.src = url;
    // min4.src = url;
};


pump.addEventListener('submit', (e) => {
    const formData = new FormData(e.target);
    e.preventDefault();
    console.log(formData.get("pumps"));
});
test_tube_nozzle.addEventListener('submit', (e) => {
    const formData = new FormData(e.target);
    e.preventDefault();
    console.log(formData.get("test_tube_nozzle"));
    console.log(formData.get("nozzle_no"));
});
test_tube_colour.addEventListener('submit', (e) => {
    const formData = new FormData(e.target);
    e.preventDefault();
    console.log(formData.get("test_tube_colour"));
});