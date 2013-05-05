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
	
	finishAnimations();
	map.closePopup();
	
	if ( !currentDay.STEPS ){
		if ( playing ) playTimer = setTimeout( nextDay, 3000 );
		return;
	} else if ( !currentDay.STEPS[ currentStep ] ) {
		nextDay();
		return;
	}
	
	var step = currentDay.STEPS[ currentStep ],
		marker,
		icon;
		
	$( "#step" ).html( currentStep + " of " + currentDay.STEPS.length )
	$( "#top b").html( step.TEXT );
	
	
	if ( step.TYPE != "Clash" ){
		icon = L.icon( { iconUrl: icons[ step.TYPE + step.CERTAINTY ] || icons.Rebels1, iconSize: parseInt(step.CERTAINTY) ? [16,16] : [90,90] } );
	} else {
		icon = L.icon( { iconUrl: icons[ step.TYPE ] || icons.Rebels1, iconSize: [70,80], iconAnchor: [45,65] } );
	}

	if ( step.LOC.length > 1 ){
		console.log("animated");
		
		marker = L.animatedMarker( [ L.latLng( step.LOC[0].LAT, step.LOC[0].LON ), L.latLng( step.LOC[1].LAT, step.LOC[1].LON ) ], {
			icon: icon,
			onEnd: function(){
				var popup = L.revoltPopup({closeButton:false, className: this.step.TYPE.toLowerCase().replace(" ","-")}).setLatLng( this.getLatLng() ).setContent( getPopupContent(this.step) );
				marker.on('mouseover',function(){
					if ( !map.hasLayer( popup ) ){
						popup.openOn(map);
						expandPopup(this.step,popup);
					}
				}).on('mouseout',function(event){
					if ( !$(event.originalEvent.relatedTarget).hasClass("leaflet-popup-content-wrapper") )
						map.closePopup();
				});
				if ( step.VALUE ){
					popup.openOn(map);
					expandPopup(this.step,popup);
				}
				if ( playing ) playTimer = setTimeout( nextStep, 3000 );
			},
			interval: 10
		} );
		marker.step = step;
		
		if ( markers[ step.ID ] && map.hasLayer( markers[ step.ID ] ) )
			mapLayers.removeLayer( markers[ step.ID ] );
		
		markers[ step.ID ] = marker;
		mapLayers.addLayer(marker);
	
		var poly = L.animatedLine( [ L.latLng( step.LOC[0].LAT, step.LOC[0].LON ), L.latLng( step.LOC[1].LAT, step.LOC[1].LON ) ], {
			color: colors[ step.TYPE ] || colors.Rebels,
			weight: 15
		} )
		lines.push(poly);
		mapLayers.addLayer(poly);
	} else {
		console.log("static");
		
		marker = L.marker( L.latLng( step.LOC[0].LAT, step.LOC[0].LON ), {
			icon: icon
		} );
		
		if ( markers[ step.ID ] && map.hasLayer( markers[ step.ID ] ) )
			mapLayers.removeLayer( markers[ step.ID ] );
			
		markers[ step.ID ] = marker;
		marker.step = step;
		mapLayers.addLayer( marker );
		
		var popup = L.revoltPopup({closeButton:false, className: marker.step.TYPE.toLowerCase().replace(" ","-")}).setLatLng( marker.getLatLng() ).setContent( getPopupContent(marker.step) );
		marker.on('mouseover',function(){
			if ( !map.hasLayer( popup ) ){
				popup.openOn(map);
				expandPopup(marker.step,popup);
			}
		}).on('mouseout',function(event){
			if ( !$(event.originalEvent.relatedTarget).hasClass("leaflet-popup-content-wrapper") )
				map.closePopup();
		});
		
		if ( step.VALUE ){
			popup.openOn(map);
			expandPopup(step,popup);
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

function finishAnimations(){
	for ( var i in markers ){
		if ( !markers[i].finished && markers[i].finish ) markers[i].finish();
	}
	for ( i in lines ){
		if ( !lines[i].finished ) lines[i].finish();
	}
	clearTimeout(playTimer);	// prevent the onEnd callbacks from starting this timer
}