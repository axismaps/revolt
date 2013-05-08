var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function buildTimeline(){
	var timeline = $( "<div id='timeline'></div>" ).width( 10 + 9*(dateRange[1] - dateRange[0])/86400000 ),
		track = $( "<div></div>" ).css( "width", "100%" ),
		month;
	$( "#bottom" ).append( timeline.append(track) );
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
		track.append( dayElement );
		if ( date.getMonth() != month ){
			var m = date.getMonth();
			var str = months[m].toUpperCase();
			if ( !month || !m ) str += " " + date.getFullYear();
			month = m;
			var divider = $("<div class='timeline-divider'></div>")
				.css("left",dayElement.position().left);
			timeline.append( divider );
			var label = $( "<p class='month-label'>" + str + "</p>" )
				.css("left",dayElement.position().left)
				.css("top",25);
			timeline.append(label);
		}
	}
}