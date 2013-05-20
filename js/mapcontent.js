var icons = {
	Militia1: "images/militia.png",
	Maroons1: "images/maroons.png",
	Navy1: "images/navy.png",
	Army1: "images/regulars.png",
	Rebels1: "images/rebels.png",
	Conspiracy1: "images/conspiracy.png",
	"Slave Court1": "images/slavecourt.png",
	Militia0: "images/0militia.png",
	Maroons0: "images/0maroons.png",
	Navy0: "images/0navy.png",
	Army0: "images/0regulars.png",
	Rebels0: "images/0rebels.png",
	Conspiracy0: "images/0conspiracy.png",
	"Slave Court0": "images/0slavecourt.png",
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
		console.log( val % 2 )
		if ( val % 2 ) dudes.append( "<div class='halfdude'/>" );
		div.append( dudes );
	}
	outer.append(div);
	if ( step.VALUE ){
		units = "<div class='probe-units'>" + step.UNITS + ": " + step.VALUE + "</div>";
		outer.append(units);
	}
	return outer.html();
}

function expandPopup( step, popup ){
	if ( !popup._container ) return;
	$(".probe-units",popup._container).hide();
	$(popup._container).mouseenter( function(event){
		$(".probe-units",popup._container).show();
	});
	$(popup._container).mouseleave( function(event){
		map.closePopup();
		$(".probe-units",popup._container).hide();
	});
}