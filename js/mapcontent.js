var icons = {
	Militia: "images/militia.png",
	Maroons: "images/maroons.png",
	Navy: "images/navy.png",
	Army: "images/regulars.png",
	Rebels: "images/rebels.png",
}

var colors = {
	Militia: "#2e4d0a",
	Maroons: "#5b2a5c",
	Navy: "#2c2e5d",
	Army: "#735619",
	Rebels: "#7d312c",
}

function getPopupContent( step ){
	var outer = $("<div>");
	var div = $( "<div class='popup-name'>" );
	div.append( "<p>" + step.NAME + "</p>" );
	if ( step.VALUE ){
		var val = Math.max( 1, Math.round(step.VALUE / 100) ),
			dudes = $( "<div class='dudes'/>" );
		for ( var i = 0; i < val; i ++ ){
			dudes.append( "<div class='dude'/>" );
		}
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
	if ( !step.VALUE || !popup._container ) return;
	$(".probe-units",popup._container).hide();
	$(popup._container).mouseenter( function(event){
		$(".probe-units",popup._container).show();
	});
	$(popup._container).mouseleave( function(event){
		$(".probe-units",popup._container).hide();
	});
}