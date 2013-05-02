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
	
	$( ".basemap-link" ).click( function(){
		if ( this.innerHTML == "Places Map" && !map.hasLayer( placesMap ) ){
			map.removeLayer( terrainMap );
			map.addLayer( placesMap, true );
		} else if ( this.innerHTML == "Terrain Map" && !map.hasLayer( terrainMap ) ){
			map.removeLayer( placesMap );
			map.addLayer( terrainMap, true );
		}
		$( ".basemap-link.selected" ).removeClass("selected");
		$(this).addClass("selected")
	});	
}