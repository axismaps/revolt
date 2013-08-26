Jamaican Slave Revolt
======

This animated thematic map narrates the spatial history of the greatest slave insurrection in the eighteenth century British Empire. It was a collaboration between Axis Maps and [Vincent Brown](mailto:brown8@fas.harvard.edu) at Harvard University.

## Data
The data was collected in a [spreadsheet](https://docs.google.com/spreadsheet/pub?key=0AjwyKJQXN7nzdEVJRWpGOGppTEZJTzFkSExKUWtVR2c&output=html) which was loaded into MySQL and converted to JSON using [make_revolt.php](data/php/make_revolt.php).

[revolt.json](json/revolt.json) contains all the attribute and spatial data used in the map. The animated marker paths are defined by `LOC` as an array of lat / lon arrays.

## Code
The map is built on Leaflet. The animation is handled by [AnimatedLine.js](lib/AnimatedLine.js) which is based on [Leaflet.AnimatedMarker](https://github.com/openplans/Leaflet.AnimatedMarker). Like AnimatedMarker, AnimatedLine breaks an input PolyLine into small segments, then over a specified interval "grows" the PolyLine by including each of those segments in sequence.

## Installation
	make install