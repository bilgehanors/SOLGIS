
function calculatePanels() {
    var slopeSelect = document.getElementById('slope-roof');
    var positionSelect = document.getElementById('position-roof');
    var areaValue = parseFloat(document.getElementById("area-value").textContent);
    var usage = parseFloat(document.getElementById("demo").textContent);
    
    var selectedSlope = slopeSelect.value;
    var selectedPosition = positionSelect.value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/calculate_area/", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(JSON.stringify({use:usage, slope: selectedSlope, position: selectedPosition, area: areaValue }));

    xhr.onload = function () {
        if (xhr.status === 200) {
            var resultContainer = document.getElementById("result-container");
            resultContainer.innerHTML = xhr.responseText;
        } else {
            console.error("Error:", xhr.statusText);
        }
    };
}

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
  output.innerHTML = this.value;
}



var satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '',
        attributionControl: false
    });
    
var streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Â© OpenStreetMap contributors'
});

var map = L.map('map', {
center: [39.86550970762486, 32.73379759178506],
zoom: 20,
layers: [satelliteLayer] 
});

var baseMaps = {
"Satellite": satelliteLayer,
"Street": streetLayer
};

L.control.layers(baseMaps).addTo(map);
map.editable = new L.Editable(map);

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var drawControl = new L.Control.Draw({
    edit: {
        featureGroup: drawnItems,
        remove: true,
        edit: false
    },
    draw: {
        polygon: {
            icon: new L.DivIcon({
            iconSize: new L.Point(5, 5),
            className: 'leaflet-div-icon leaflet-editing-icon my-own-class'
    }),
            allowIntersection: false,
            showArea: true,
            shapeOptions: {
                color: 'red' 
                
            },
            drawError: {
                color: 'red', 
                timeout: 1000
            }
        },
        marker: false,
        circle: false,
        polyline: false,
        rectangle: false
    }
});
map.addControl(drawControl);


document.getElementById('area-value').textContent = '0';
map.on('draw:created', function (e) {
    var layer = e.layer;
    drawnItems.clearLayers();
    drawnItems.addLayer(layer);
    updateAreaDisplay(layer);
});

function updateAreaDisplay(layer) {
    if (layer instanceof L.Polygon) {
        var area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
        document.getElementById('area-value').textContent = area.toFixed(2);
    }
}

function handleSlopeChange() {
    var slopeSelect = document.getElementById('slope-roof');
    var selectedValue = slopeSelect.value;


    // Check if the selected value is "dont-know"
    if (selectedValue === 'dont-know') {
        // Create an input element
        var inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.placeholder = 'Enter slope value';
        // Append the input element to the search-bar div
        document.getElementById('search-bar').appendChild(inputElement);
    }
    if (selectedValue === 'inclined') {
        // Create an input element
        var inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.placeholder = 'Enter slope value';
        // Append the input element to the search-bar div
        document.getElementById('search-bar').appendChild(inputElement);
    } else {
        // Remove any existing input element
        var existingInput = document.querySelector('#search-bar input');
        if (existingInput) {
            existingInput.remove();
        }
    }
    
}


function handleSlopeChange() {
    var select = document.getElementById("slope-roof");
    var selectedValue = select.options[select.selectedIndex].text;
    var selectedValueDiv = document.getElementById("selected-value");
    selectedValueDiv.textContent = "Selected Slope: " + selectedValue;

    // Show or hide the input box based on the selected value
    var inputBoxContainer = document.getElementById("input-box-container");
    inputBoxContainer.style.display = (selectedValue === "If you are not sure") ? "block" : "none";
}





var searchControl = L.Control.geocoder().addTo(map);
        document.getElementById('search-bar').appendChild(searchControl.getContainer());


















