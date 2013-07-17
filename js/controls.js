function setupControls(){
	$( "#play" ).click( function(){ 
		if ( !playing ) {
			playing = true;
			if ( !currentDay) gotoDay( $(".timeline-event").eq(0).attr("id").substr(1) );
			else nextStep();
			$(this).addClass("playing").html( "<b>PAUSE &nbsp;&nbsp;&nbsp;&nbsp;</b>");
		} else {
			playing = false;
			clearTimeout( playTimer );
			$(this).removeClass("playing").html( "<b>PLAY &nbsp;&nbsp;</b>");
		}
	});
	
	$( "#next" ).click( function(){ 
		clearTimeout( playTimer );
		if ( !currentDay) gotoDay( $(".timeline-event").eq(0).attr("id").substr(1) );
		else if ( !currentDay.STEPS) nextDay();
		else nextStep();
	});
	
	$( "#prev" ).click( function(){ 
		clearTimeout( playTimer );
		previousStep();
	});
	
	$( ".basemap-link" ).click( function(){
		if ( this.innerHTML == "Places Map" && !map.hasLayer( placesMap ) ){
			map.removeLayer( terrainMap );
			map.addLayer( placesMap, true );
			$( "#legend a.fancybox" ).show();
		} else if ( this.innerHTML == "Terrain Map" && !map.hasLayer( terrainMap ) ){
			map.removeLayer( placesMap );
			map.addLayer( terrainMap, true );
			$( "#legend a.fancybox" ).hide();
		}
		$( ".basemap-link.selected" ).removeClass("selected");
		$(this).addClass("selected")
	});
	
	$( ".triangle" ).click( function(){
		$(this).next().trigger("click");
	});
	
	$( "#legend-title" ).click( function(){
		if ( $( "#legend" ).height() ){
			$( "#legend" ).height(0);
			$( "#text" ).height( $( window ).height() - $( "#controls" ).outerHeight() - $( "#date" ).outerHeight() - $( "#legend-title" ).outerHeight() - 25 );
		} else {
			$( "#legend" ).height("auto");
			$( "#text" ).height( $( window ).height() - $( "#controls" ).outerHeight() - $( "#date" ).outerHeight() - $( "#legend-title" ).outerHeight() - $( "#legend" ).outerHeight() - 25);
		}
		if ( $(this).prev().hasClass( "open" ) ) $(this).prev().removeClass( "open" );
		else $(this).prev().addClass( "open" )
	});
}