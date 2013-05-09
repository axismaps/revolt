function resize() {
	$( "#map" ).height( $( window ).height() - $( "#bottom" ).height() - $( "#top" ).height() );
	$( "#timeline-container" ).width( $( "#bottom" ).width() - 70 );
	$( "#text" ).height( $( window ).height() - $( "#controls" ).outerHeight() - $( "#date" ).outerHeight() );
	$( "#top" ).width( $( window ).width() - 230 )
}