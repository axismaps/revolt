var playing = false,
	currentDay,
	currentStep,
	playTimer;

function gotoDay( date ){
	$( ".timeline-event.selected" ).removeClass( "selected" );
	$( "#t" + date ).addClass( "selected" )
	var d = new Date(parseInt(date)),
		dateString = ( d.getMonth() + 1 ) + "/" + d.getDate() + "/" + d.getFullYear();
	console.log("Date",dateString);
	currentDay = mapData[ dateString ];
	currentStep = -1;
	finishAnimations();
	markers = {};
	lines = [];
		
	mapLayers.clearLayers();
	map.closePopup();
	
	$( "#date" ).html( currentDay.DATE );
	$( "#text" ).html( currentDay.TEXT + "<br /><br />" );
	var b = getDayBounds( currentDay );
	if ( b && auto_pan( b ) ) {
		playTimer = setTimeout( nextStep, 2500 );
		//console.log("time")
	} else {
		nextStep();
	}
}

function nextDay(){
	if ( !currentDay ){
		$( ".timeline-event" ).first().trigger("click");
		return;
	}
	var index = $( "#t" + currentDay.ms ).index( ".timeline-event" ),
		next = $( ".timeline-event" ).eq( index + 1 );
	if ( next ) next.trigger("click");
	if ( next.position().left > $('#timeline-container').width() ) {
		$( "#timeline-container" ).animate({ scrollLeft: next[0].offsetLeft - ($( "#timeline-container" ).width() * 0.75 ) }, 500);
	} else if ( next.position().left < $('#timeline-container').scrollLeft() ) {
		$( "#timeline-container" ).animate({ scrollLeft: next[0].offsetLeft - ($( "#timeline-container" ).width() * 0.25 ) }, 500);
	}
}

function previousDay(){
	if ( !currentDay ) return;
	var index = $( "#t" + currentDay.ms ).index( ".timeline-event" );
	if ( index == 0 ) return;
	var	prev = $( ".timeline-event" ).eq( index - 1 );
	if ( prev ) prev.trigger("click");
	if ( prev.position().left > $('#timeline-container').width() ) {
		$( "#timeline-container" ).animate({ scrollLeft: prev[0].offsetLeft - ($( "#timeline-container" ).width() * 0.75 ) }, 500);
	} else if ( prev.position().left < $('#timeline-container').scrollLeft() ) {
		$( "#timeline-container" ).animate({ scrollLeft: prev[0].offsetLeft - ($( "#timeline-container" ).width() * 0.25 ) }, 500);
	}
}

function nextStep(){
	currentStep++;
	
	finishAnimations();
	map.closePopup();
	
	if ( !currentDay.STEPS ){
		if ( playing ) playTimer = setTimeout( nextDay, 3000 );
		//console.log("time")
		return;
	} else if ( !currentDay.STEPS[ currentStep ] ) {
		nextDay();
		return;
	}
	
	var step = currentDay.STEPS[ currentStep ],
		marker,
		icon;
		
	$( "#step" ).html( ( currentStep + 1 ) + " of " + currentDay.STEPS.length )
	$( "#top b").html( step.TEXT );
	
	
	if ( step.TYPE != "Clash" ){
		icon = L.icon( { iconUrl: icons[ step.TYPE + step.CERTAINTY ] || icons.Rebels1, iconSize: parseInt(step.CERTAINTY) ? [16,16] : [34,34] } );
	} else {
		icon = L.icon( { iconUrl: icons[ step.TYPE ] || icons.Rebels1, iconSize: [40,60], iconAnchor: [25,55] } );
	}

	if ( step.LOC.length > 1 ){
		console.log("animated");
		
		var pts = [];
		for ( var i = 0; i < step.LOC.length; i++ ){
			pts.push( L.latLng( step.LOC[i][0], step.LOC[i][1] ) );
		}
		marker = L.animatedMarker( pts, {
			icon: icon,
			onEnd: function(){ createPopup(this); if ( playing ) playTimer = setTimeout( nextStep, 3000 ); },	// mapcontent.js
			maxDuration: 5000
		} );
		marker.step = step;
		
		if ( markers[ step.ID ] && map.hasLayer( markers[ step.ID ] ) )
			mapLayers.removeLayer( markers[ step.ID ] );
		
		markers[ step.ID ] = marker;
		mapLayers.addLayer(marker);
		
		var poly = L.animatedLine( pts, {
			color: colors[ step.TYPE ] || colors.Rebels,
			weight: 15,
			onEnd: function(){ createPopup(this) },
			maxDuration: 5000
			
		} );
		poly.step = step;
		lines.push(poly);
		mapLayers.addLayer(poly);
	} else {
		console.log("static");
		
		marker = L.marker( L.latLng( step.LOC[0][0], step.LOC[0][1] ), {
			icon: icon
		} );
		
		if ( markers[ step.ID ] && map.hasLayer( markers[ step.ID ] ) )
			mapLayers.removeLayer( markers[ step.ID ] );
			
		markers[ step.ID ] = marker;
		marker.step = step;
		mapLayers.addLayer( marker );
		
		createPopup(marker);
		
		if ( playing ) playTimer = setTimeout( nextStep, 3000 );
		//console.log("time")
	}
}

function previousStep(){
	if ( currentStep == 0 ){
		previousDay();
	} else {
		//console.log(currentStep);
		goToStep( currentStep - 1 );
	}
}

function goToStep(index){
	gotoDay( currentDay.ms );
	while (currentStep < index){
		nextStep();
	}
}

function getDayBounds( day ){
	var steps = day.STEPS;
	if ( !steps ) return null;
	var latlngs = [];
	for ( var i = 0; i < steps.length; i++ ){
		for ( var n = 0; n < steps[i].LOC.length; n++ ){
			latlngs.push( L.latLng(steps[i].LOC[n][0],steps[i].LOC[n][1]) );
		}
	}
	return L.latLngBounds( latlngs );
}

function pauseAnimations(){
	for ( var i in markers ){
		if ( markers[i].stop ) markers[i].stop();
	}
	for ( i in lines ){
		if ( lines[i].stop ) lines[i].stop();
	}
	if ( playing ) clearTimeout(playTimer);
	//console.log("clear time")
}

function resumeAnimations(){
	var animating = false;
	for ( var i in markers ){
		if ( markers[i].start && !markers[i].finished ){
			markers[i].start();
			animating = true;
		} 
	}
	for ( i in lines ){
		if ( lines[i].start && !lines[i].finished ) lines[i].start();
	}
	//console.log(animating)
	if ( playing && !animating ) playTimer = setTimeout( nextStep, 3000 );
	//console.log("time")
}

function finishAnimations(){
	for ( var i in markers ){
		if ( !markers[i].finished && markers[i].finish ) markers[i].finish();
	}
	for ( i in lines ){
		if ( !lines[i].finished ) lines[i].finish();
	}
	clearTimeout(playTimer);	// prevent the onEnd callbacks from starting this timer
	//console.log("clear time")
}