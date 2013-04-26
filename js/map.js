$(document).ready( initialize );

var jsonUrl = "data/json/revolt.json";

var map,
	mapLayers,
	markers;
	
var mapData,
	dateRange = [Infinity,-Infinity],
	currentDay,
	currentStep,
	playTimer;
	
var playing = true;

function initialize() {
	map = L.map('map').setView([18.188, -77.363], 10);
	L.tileLayer('data/tiles/terrain/{z}/{x}/{y}.png', {maxZoom: 12, minZoom: 7} ).addTo(map);
	mapLayers = L.layerGroup().addTo(map);
	loadMapData();
	
	$(window).resize( resize );
	resize();
	
	$( "#play" ).click( function(){ 
		playing = true;
		if ( !currentDay) gotoDay( $(".timeline-event").eq(0).attr("id").substr(1) );
		else nextStep();
	});
	
	$( "#stop" ).click( function(){ 
		playing = false;
		clearTimeout( playTimer );
	});
	
	$( "#next" ).click( function(){ 
		clearTimeout( playTimer );
		if ( !currentDay) gotoDay( $(".timeline-event").eq(0).attr("id").substr(1) );
		else nextStep();
	});
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
						.attr( "id" , "t" + i );
		if ( mapData[ dateString ] ){
			mapData[ dateString ].ms = i;
			dayElement
				.addClass( "timeline-event" )
				.click( function(){ 
					gotoDay( $(this).attr("id").substr(1) );
				});
		}
		timeline.append( dayElement );
	}
	$( "#bottom" ).append( timeline );
}

function gotoDay( date ){
	$( ".timeline-event.selected" ).removeClass( "selected" );
	$( "#t" + date ).addClass( "selected" )
	var d = new Date(parseInt(date)),
		dateString = ( d.getMonth() + 1 ) + "/" + d.getDate() + "/" + d.getFullYear();
	console.log("Date",dateString);
	currentDay = mapData[ dateString ];
	
	currentStep = -1;
	markers = {};
		
	mapLayers.clearLayers();
		
	nextStep();
}

function nextStep(){
	currentStep++;
	console.log( "Step", currentStep );
	
	if ( !currentDay.STEPS || !currentDay.STEPS[ currentStep ] ) {
		var index = $( "#t" + currentDay.ms ).index( ".timeline-event" ),
			next = $( ".timeline-event" ).eq( index + 1 );
		if ( next ) next.trigger("click");
		return;
	};
	
	var step = currentDay.STEPS[ currentStep ],
		marker;
		
	if ( step.LOC.length > 1 ){
		console.log("animated");
		
		marker = L.animatedMarker( [ L.latLng( step.LOC[0].LAT, step.LOC[0].LON ), L.latLng( step.LOC[1].LAT, step.LOC[1].LON ) ], {
			icon: L.divIcon( { className: "map-marker", iconSize: L.point(20,20) } ),
			onEnd: function(){
				if ( playing ) playTimer = setTimeout( nextStep, 3000 );
			},
			interval: 15
		} );
		
		if ( markers[ step.ID ] && map.hasLayer( markers[ step.ID ] ) )
			mapLayers.removeLayer( markers[ step.ID ] );
			
		markers[ step.ID ] = marker;
		mapLayers.addLayer(marker);
		
		var poly = L.polylineTracer( [ L.latLng( step.LOC[0].LAT, step.LOC[0].LON ), L.latLng( step.LOC[1].LAT, step.LOC[1].LON ) ], {
			color: "#82322d",
			weight: 15
		} )
		mapLayers.addLayer(poly);
	} else {
		console.log("static");
		
		marker = L.marker( L.latLng( step.LOC[0].LAT, step.LOC[0].LON ), {
			icon: L.divIcon( { className: "map-marker", iconSize: L.point(20,20) } )
		} );
		
		if ( markers[ step.ID ] && map.hasLayer( markers[ step.ID ] ) )
			mapLayers.removeLayer( markers[ step.ID ] );
			
		mapLayers.addLayer( marker );
		if ( playing ) playTimer = setTimeout( nextStep, 3000 );
	}
}