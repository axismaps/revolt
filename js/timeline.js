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