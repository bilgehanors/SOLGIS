var map = L.map('map', {
    center: [39.9854, 32.7192],
    zoom: 30
});

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri'
}).addTo(map);

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
L.control.measure().addTo(map);

document.getElementById('area-value').textContent = '0';
map.on('draw:created', function (e) {
    var layer = e.layer;
    drawnItems.clearLayers();
    drawnItems.addLayer(layer);
    updateAreaDisplay(layer);
});
var searchControl = L.Control.geocoder().addTo(map);
        document.getElementById('search-bar').appendChild(searchControl.getContainer());

        document.getElementById('area-value').textContent = '0';
        map.on('draw:created', function (e) {
            var layer = e.layer;
            drawnItems.clearLayers();
            drawnItems.addLayer(layer);
            updateAreaDisplay(layer);
        });
        var searchControl = L.Control.geocoder().addTo(map);
        document.getElementById('search-bar').appendChild(searchControl.getContainer());

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
function updateAreaDisplay(layer) {
    if (layer instanceof L.Polygon) {
        var area = L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]);
        document.getElementById('area-value').textContent = area.toFixed(2);
    }
}
