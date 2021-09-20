
var microscope = document.getElementById("microscope")
var pump = document.getElementById('pump')
var test_tube_nozzle = document.getElementById('stepper_nozzle')
var test_tube_colour = document.getElementById('stepper_colour')
microscope.onclick = function() {
    axios({
        url: 'http://192.168.30.151:8000/capture_micro',
        method: 'GET',
        responseType: 'blob'
    })
    .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'image.jpg');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    })
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