$(document).ready( initialize );

function initialize() {
	setupMap();
	loadMapData();
	setupControls();
	$( window ).resize( resize );
	resize();
	$('.fancybox').fancybox();
}