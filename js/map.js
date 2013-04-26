$(document).ready( initialize );

var jsonUrl = "data/json/revolt.json";

var map,
	mapData,
	dateRange = [Infinity,-Infinity];

function initialize() {
	map = L.map('map').setView([18.188, -77.363], 10);
	L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {maxZoom: 13, minZoom: 8} ).addTo(map);
	
	loadMapData();
	
	$(window).resize( resize );
	resize();
}

function resize() {
	$( "#map" ).height( $(window).height() - $( "#bottom" ).height() );
}

function loadMapData() {
	$.getJSON( jsonUrl, function(data){
		mapData = data;
		for ( var i in mapData ){
			if ( Date.parse( i ) < dateRange[0] ) dateRange[0] = Date.parse( i );
			if ( Date.parse( i ) > dateRange[1] ) dateRange[1] = Date.parse( i );
		}
		buildTimeline();
	});
}

function buildTimeline(){
	var timeline = $( "<div id='timeline'></div>" ).width( 10 + 9*(dateRange[1] - dateRange[0])/86400000 );
	for ( var i = dateRange[0]; i <= dateRange[1]; i += 86400000 ){
		var date = new Date(i),
			dateString = ( date.getMonth() + 1 ) + "/" + date.getDate() + "/" + date.getFullYear();
		var dayElement = $( "<div/>" )
						.addClass( "timeline-day" )
						.attr( "id" , "t" + i )
						.click( function(){ gotoDay( $(this).attr("id").substr(1) ) } );
		if ( mapData[ dateString ] ){
			dayElement.addClass( "timeline-event" );
		}
		timeline.append( dayElement );
	}
	$( "#bottom" ).append( timeline );
}

function gotoDay( date ){
	var d = new Date(parseInt(date)),
		dateString = ( d.getMonth() + 1 ) + "/" + d.getDate() + "/" + d.getFullYear(),
		day = mapData[ dateString ];
		
	var i = -1,
		markers = {};
		
	doStep();
	
	function doStep(){
		i++;
		console.log( "Step", i );
		var step = day.STEPS[ i ],
			marker;
		if ( !step ) return;
		if ( step.LOC.length > 1 ){
			console.log("animated");
			
			marker = L.animatedMarker( [ L.latLng( step.LOC[0].LAT, step.LOC[0].LON ), L.latLng( step.LOC[1].LAT, step.LOC[1].LON ) ], {
				icon: L.divIcon( { className: "map-marker", iconSize: L.point(20,20) } ),
				onEnd: function(){
					//map.removeLayer(this);
					doStep();
				},
				interval: 15
			} );
			
			if ( markers[ step.ID ] && map.hasLayer( markers[ step.ID ] ) )
				map.removeLayer( markers[ step.ID ] );
				
			markers[ step.ID ] = marker;
			map.addLayer(marker);
			
			var poly = L.polylineTracer( [ L.latLng( step.LOC[0].LAT, step.LOC[0].LON ), L.latLng( step.LOC[1].LAT, step.LOC[1].LON ) ] ).addTo(map);
		} else {
			console.log("static");
			
			marker = L.marker( L.latLng( step.LOC[0].LAT, step.LOC[0].LON ), {
				icon: L.divIcon( { className: "map-marker", iconSize: L.point(20,20) } )
			} );
			
			if ( markers[ step.ID ] && map.hasLayer( markers[ step.ID ] ) )
				map.removeLayer( markers[ step.ID ] );
				
			map.addLayer( marker );
			setTimeout( doStep, 5000 );
		}
	}
}
