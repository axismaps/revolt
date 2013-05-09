var jsonUrl = "json/revolt.json",
	mapData,
	dateRange = [Infinity,-Infinity];

function loadMapData() {
	$.getJSON( jsonUrl, function(data){
		mapData = data;
		for ( var i in mapData ){
			if ( Date.parse( i ) < dateRange[0] ) dateRange[0] = Date.parse( i );
			if ( Date.parse( i ) > dateRange[1] ) dateRange[1] = Date.parse( i );
		}
		buildTimeline();
		nextDay();
		resize();
	});
}