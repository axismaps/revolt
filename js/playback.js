var playing = false,
	currentDay,
	currentStep,
	playTimer;;

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
	
	$( "#text" ).html( currentDay.TEXT );
	var b = getDayBounds( currentDay );
	if ( b && auto_pan( b ) ) {
		playTimer = setTimeout( nextStep, 2500 );
	} else {
		nextStep();
	}
}

function nextDay(){
	var index = $( "#t" + currentDay.ms ).index( ".timeline-event" ),
		next = $( ".timeline-event" ).eq( index + 1 );
	if ( next ) next.trigger("click");
}

function nextStep(){
	currentStep++;
	console.log( "Step", currentStep );
	
	map.closePopup();
	
	if ( !currentDay.STEPS ){
		if ( playing ) playTimer = setTimeout( nextDay, 3000 );
		return;
	} else if ( !currentDay.STEPS[ currentStep ] ) {
		nextDay();
		return;
	}
	
	var step = currentDay.STEPS[ currentStep ],
		marker;
		
	if ( step.LOC.length > 1 ){
		console.log("animated");

		marker = L.animatedMarker( [ L.latLng( step.LOC[0].LAT, step.LOC[0].LON ), L.latLng( step.LOC[1].LAT, step.LOC[1].LON ) ], {
			icon: L.icon( { iconUrl: icons[ step.TYPE ] || icons.Rebels, iconSize: [16,16] } ),
			onEnd: function(){
				//marker.bindPopup( getPopupContent(step) );
				var popup = L.revoltPopup({closeButton:false, className: step.TYPE.toLowerCase()}).setLatLng( this.getLatLng() ).setContent( getPopupContent(step) );
				marker.on('click',function(){
					popup.openOn(map);
				});
				if ( step.VALUE ){
					popup.openOn(map);
				}
				if ( playing ) playTimer = setTimeout( nextStep, 3000 );
			},
			interval: 10
		} );
		
		if ( markers[ step.ID ] && map.hasLayer( markers[ step.ID ] ) )
			mapLayers.removeLayer( markers[ step.ID ] );
			
		markers[ step.ID ] = marker;
		mapLayers.addLayer(marker);
	
		var poly = L.animatedLine( [ L.latLng( step.LOC[0].LAT, step.LOC[0].LON ), L.latLng( step.LOC[1].LAT, step.LOC[1].LON ) ], {
			color: colors[ step.TYPE ] || colors.Rebels,
			weight: 15
		} )
		mapLayers.addLayer(poly);
	} else {
		console.log("static");
		
		marker = L.marker( L.latLng( step.LOC[0].LAT, step.LOC[0].LON ), {
			icon: L.icon( { iconUrl: icons[ step.TYPE ] || icons.Rebels, iconSize: [16,16] } )
		} );
		
		if ( markers[ step.ID ] && map.hasLayer( markers[ step.ID ] ) )
			mapLayers.removeLayer( markers[ step.ID ] );
			
		mapLayers.addLayer( marker );
		var popup = L.revoltPopup({closeButton:false, className: step.TYPE.toLowerCase()}).setLatLng( marker.getLatLng() ).setContent( getPopupContent(step) );
		marker.on('click',function(){
			popup.openOn(map);
		});
		if ( step.VALUE ){
			popup.openOn(map);
		}
		if ( playing ) playTimer = setTimeout( nextStep, 3000 );
	}
}

function getDayBounds( day ){
	var steps = day.STEPS;
	if ( !steps ) return null;
	var latlngs = [];
	for ( var i = 0; i < steps.length; i++ ){
		for ( var n = 0; n < steps[i].LOC.length; n++ ){
			latlngs.push( L.latLng(steps[i].LOC[n].LAT,steps[i].LOC[n].LON) );
		}
	}
	return L.latLngBounds( latlngs );
}