function resize() {
	$( "#map" ).height( $( window ).height() - $( "#bottom" ).height() - $( "#top" ).height() );
	if ( $( "#legend" ).height() ){
		$( "#text" ).height( $( window ).height() - $( "#controls" ).outerHeight() - $( "#date" ).outerHeight() - $( "#legend-title" ).outerHeight() - $( "#legend" ).outerHeight() - 25 );
	} else {
		$( "#text" ).height( $( window ).height() - $( "#controls" ).outerHeight() - $( "#date" ).outerHeight() - $( "#legend-title" ).outerHeight() - 25 );
	}
	$( "#top" ).width( $( window ).width() - 230 )
}