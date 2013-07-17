var icons = {
	Militia1: "images/militia.png",
	Maroons1: "images/maroons.png",
	Navy1: "images/navy.png",
	Army1: "images/regulars.png",
	Rebels1: "images/rebels.png",
	Conspiracy1: "images/conspiracy.png",
	"Slave Court1": "images/slavecourt.png",
	Militia0: "images/militia_uncertain.png",
	Maroons0: "images/maroons_uncertain.png",
	Navy0: "images/navy_uncertain.png",
	Army0: "images/army_uncertain.png",
	Rebels0: "images/rebels_uncertain.png",
	Conspiracy0: "images/conspiracy_uncertain.png",
	"Slave Court0": "images/slavecourt_uncertain.png",
	Clash: "images/clash.png"
}

var colors = {
	Militia: "#197872",
	Maroons: "#5e2d5f",
	Navy: "#2e3060",
	Army: "#34510c",
	Rebels: "#82332e",
	Conspiracy: "#a78f0e",
	"Slave Court": "#9d561c",
	Clash: "#4d433e"
}

function createPopup(object){
	
	if ( !object.step.NAME ) return;

	var isLine = !object.getLatLng,
		latLng = isLine ? L.latLng(0,0) : object.getLatLng(),
		popup = L.revoltPopup({closeButton:false, className: object.step.TYPE.toLowerCase().replace(" ","-")}).setLatLng( latLng ).setContent( getPopupContent(object.step) );
	object.on('mouseover',function(event){
		if ( !map.hasLayer( popup ) ){
			if ( isLine ) popup.setLatLng( event.latlng )
			popup.openOn(map);
			expandPopup(this.step,popup,object);
			pauseAnimations();
		}
	}).on('mouseout',function(event){
		if ( !$(event.originalEvent.relatedTarget).hasClass("leaflet-popup-content-wrapper") && !$(event.originalEvent.relatedTarget).parents().hasClass("leaflet-popup-content-wrapper") ){
			map.closePopup();
			resumeAnimations();
		}

	});
	if ( !isLine ){
		popup.openOn(map);
		expandPopup(object.step,popup,object);
	}
}

function getPopupContent( step ){
	var outer = $("<div>");
	var div = $( "<div class='popup-name'>" );
	div.append( "<p>" + step.NAME + "</p>" );
	
	if ( step.VALUE ){
		var val = Math.max( 1, Math.round(step.VALUE / 50) ),
			dudes = $( "<div class='dudes'/>" );
		if ( val > 1 ){
			for ( var i = 0; i < val; i += 2 ){
				dudes.append( "<div class='dude'/>" );
			}
		}
		if ( val % 2 ) dudes.append( "<div class='halfdude'/>" );
		div.append( dudes );
	}
	
	outer.append(div);
	if ( step.VALUE || step.INFO ){
		$( "p", div ).css("line-height","14px").append("<br/><span>Click for details</span>");
		var units = "";
		if ( step.VALUE )
			units += step.UNITS + ": " + step.VALUE;
		if ( step.INFO )
			units += ( units == "" ? "" : "<br/>" ) + step.INFO;
		units = "<div class='probe-units'>" + units + "</div>";
		outer.append(units);
	}
	return outer.html();
}

function expandPopup( step, popup, object ){
	if ( !popup._container ) return;
	$( ".dudes", popup._container ).css( "float", "right" );	// float style applied on add, otherwise width calculation is pooched in ff
	$(".probe-units",popup._container).hide();
	object.on("click",function(){
		$(".probe-units",popup._container).show();
	});
	$(popup._container).children().click( function(event){
		$(".probe-units",popup._container).show();
	});
	$(popup._container).mouseleave( function(event){
		map.closePopup();
		resumeAnimations();
		$(".probe-units",popup._container).hide();
	});
}