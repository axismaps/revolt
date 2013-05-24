function resize() {
	$( "#map" ).height( $( window ).height() - $( "#bottom" ).height() - $( "#top" ).height() );
	$( "#timeline-container" ).width( $( "#bottom" ).width() - 80 );
	if ( $( "#legend" ).height() ){
		$( "#text" ).height( $( window ).height() - $( "#controls" ).outerHeight() - $( "#date" ).outerHeight() - $( "#legend-title" ).outerHeight() - $( "#legend" ).height() - 25 );
	} else {
		$( "#text" ).height( $( window ).height() - $( "#controls" ).outerHeight() - $( "#date" ).outerHeight() - $( "#legend-title" ).outerHeight() - 25 );
	}
	$( "#top" ).width( $( window ).width() - 230 )
}