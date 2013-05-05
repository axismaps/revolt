function resize() {
	$( "#map" ).height( $( window ).height() - $( "#bottom" ).height() - $( "#top" ).height() );
	$( "#text" ).height( $( window ).height() - $( "#controls" ).outerHeight() - $( "#date" ).outerHeight() );
	$( "#top" ).width( $( window ).width() - 230 )
}