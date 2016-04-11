var map,
	placesMap,
	terrainMap,
	mapLayers,
	markers,
	lines;

function setupMap(){
	map = L.map('map').fitBounds( L.latLngBounds( L.latLng(17.644, -78.409), L.latLng(18.589, -76.190) ) );
	//.setView([18.188, -77.363], 10);
	map.setZoom( Math.max( map.getZoom(), 9 ) );
	placesMap = L.tileLayer('tiles/placenames/{z}/{x}/{y}.png', {maxZoom: 13, minZoom: 7, tms: true} ).addTo(map);
	terrainMap = L.tileLayer('tiles/terrain/{z}/{x}/{y}.png', {maxZoom: 13, minZoom: 7, tms: true} );
	mapLayers = L.layerGroup().addTo(map);
}

function auto_pan( bounds ){
	//extend bounds eastward by 50 pixels to account for popup
	var ne = map.latLngToLayerPoint( bounds._northEast );
	ne.x += 50;
	bounds._northEast = map.layerPointToLatLng( ne );
	if( !map.getBounds().intersects( bounds ) && map.getZoom() > 10 ){
		map.fitBounds( L.latLngBounds( L.latLng(17.644, -78.409), L.latLng(18.589, -76.190) ) );
		window.setTimeout( function(){ map.fitBounds( bounds ) }, 1500 );
		return true;
	} else {
		map.fitBounds( bounds );
	}
}