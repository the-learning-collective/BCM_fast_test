//map creation
var map = L.map('map', {
  scrollWheelZoom: false
}).setView([40.6941, -73.9162], 14);


//basemap creation
var mainMap = L.tileLayer('http://m.elephant-bird.net/bwtiles/bwtiles/{z}/{x}/{y}.png', {
  attribution: 'mapz by ziggy'
}).addTo(map);

var osmMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'open street map'
});

var tonerAtt =  'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' + '<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' + 'Map data {attribution.OpenStreetMap}';

var toner = L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
  attribution: tonerAtt
});

var ggl = new L.Google();

//GeoCode
var osmGeocoder = new L.Control.OSMGeocoder(
  options = {position: 'bottomright'}
);

map.addControl(osmGeocoder);

//Land Use Function and PopUp Function
function LandUse_function(feature) {
  if (feature == '01') {
    return '1 & 2 Family Buildings';  
  } 
  else if (feature == '02') {
    return 'Multi-Family Walkup';
  }
  else if (feature == '03') {
    return 'Multi-Family with Elevator';
  }
  else if (feature == '04') {
    return 'Mixed Residential & Commerical';
  }
  else if (feature == '05') {
    return 'Commerical & Office';
  }
  else if (feature == '06') {
    return 'Industrial & Manufacturing';
  }
  else if (feature == '07') {
    return 'Transport & utility';
  }
  else if (feature == '08') {
    return 'Public Facilities & Insitutions';
  }
  else if (feature == '09') {
    return 'Open Space & Recreation';
  }
  else if (feature == '10') {
    return 'Parking Facilities';
  }
  else if (feature == '11') {
    return 'Vacant Land';
  }
  else {
    return feature;
  }
}

function fun_jobType (feature) {
  if (feature == 'A1') { return 'A1: Major Alteration' }
  else if (feature == 'NB') { return 'New Buliding' }
  else if (feature === 'A2' || feature == 'A3') {return 'Minor* Alteration'} 
  else {return feature;}
}

//POP UP Information

function pop_pluto(feature, layer) {
  var popupContent = '<div style="text-align: center;"><strong>Property information</strong></div><table><tr><td>Address</td><td>' + feature.properties.Address +'</td></tr><tr><td>Owner Name</td><td>' + feature.properties.OwnerName + '</td></tr><tr><td>Lot Area</td><td>' + feature.properties.LotArea +' Sq. Feet' + '</td></tr><tr><td>Floors</td><td>' + feature.properties.NumFloors + '</td></tr><tr><td>Residential Units</td><td>' + '  ' +feature.properties.UnitsRes + '</td></tr><tr><td>Year Built</td><td>' + feature.properties.YearBuilt + '</td></tr><tr><td>Built FAR</td><td>' + feature.properties.BuiltFAR + '</td></tr><tr><td>Max Res FAR</td><td>' + feature.properties.ResidFAR + '<tr><td>Land Use</td><td>' + LandUse_function(feature.properties.LandUse) + '</td></tr></table><p><a target="_blank" href="http://a836-acris.nyc.gov/bblsearch/bblsearch.asp?borough=3&block=' + feature.properties.Block + '&lot=' + feature.properties.Lot + '">Click here for ACRIS information</a>';
  
  layer.bindPopup(popupContent);
}


function fun_rentStab(feature, layer) {
  if (feature.properties.YearBuilt < 1974) {
    if (feature.properties.UnitsRes >= 6) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

var myStyle = {
  color: '#ff7800',
  weight: 2,
  opacity: 0.65
};

var blankPluto = {
  fillOpacity: 0,
  opacity: 0
};

var likelyRentStab = new L.geoJson(bushwickPluto, {
  style: myStyle,
  filter: fun_rentStab,
  onEachFeature: pop_pluto
});

var baseMaps = {
  "Tax Lots": mainMap,
  "Open Street Map": osmMap,
  "Black and White": toner,
  "Google Satellite": ggl
};
var overLays = {
  "Rent-Stabilized": likelyRentStab
};

L.control.layers(baseMaps, overLays, {collapsed: false}).addTo(map);

