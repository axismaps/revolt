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
		console.log(mapData);
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
			dayElement.addClass( "timeline-event" );
		}
		timeline.append( dayElement );
	}
	$( "#bottom" ).append( timeline );
}
