var map,
	mapLayers,
	markers;

function setupMap(){
	map = L.map('map').setView([18.188, -77.363], 10);
	L.tileLayer('data/tiles/placenames/{z}/{x}/{y}.png', {maxZoom: 12, minZoom: 7} ).addTo(map);
	mapLayers = L.layerGroup().addTo(map);
}

function auto_pan( bounds ){
	if( !map.getBounds().intersects( bounds ) && map.getZoom() > 10 ){
		map.fitBounds( L.latLngBounds( L.latLng(17.644, -78.409), L.latLng(18.589, -76.190) ) );
		window.setTimeout( function(){ map.fitBounds( bounds ) }, 1500 );
		return true;
	} else {
		map.fitBounds( bounds );
	}
}