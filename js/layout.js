function resize() {
	$( "#map" ).height( $(window).height() - $( "#bottom" ).height() );
	$( "#text" ).height( $(window).height() - $( "#controls" ).outerHeight() - $( "#date" ).outerHeight() );
}