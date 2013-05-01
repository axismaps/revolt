function setupControls(){
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
		else if ( !currentDay.STEPS) nextDay();
		else nextStep();
	});
}