function resize() {
	$( "#map" ).height( $( window ).height() - $( "#bottom" ).height() - $( "#top" ).height() );
	$( "#timeline-container" ).width( $( "#bottom" ).width() - 70 );
	if ( $( "#text" ).height() ){
		if ( $( "#legend" ).height() ){
			$( "#text" ).height( $( window ).height() - $( "#controls" ).outerHeight() - $( "#date" ).outerHeight() - $( "#legend-title" ).outerHeight() - $( "#legend" ).height() );
		} else {
			$( "#text" ).height( $( window ).height() - $( "#controls" ).outerHeight() - $( "#date" ).outerHeight() - $( "#legend-title" ).outerHeight() );
		}
	}
	$( "#top" ).width( $( window ).width() - 230 )
}