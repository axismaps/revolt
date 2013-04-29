L.PolylineTracer = L.Polyline.extend({
	initialize: function(latlngs, options) {
		options.dashArray = undefined;	// disable dashArray option; the dash array is used for animation
		
		L.Polyline.prototype.initialize.call(this, latlngs, options);
		
		this._progress = 0;
		this._offset = 0;
		this._totalDistance = this._getTotalDistance();
	},
	
	options: {
		length: "100%",
		distance: 20,
		interval: 15,
		autoStart: true,
		onEnd: function(){}
	},
	
	onAdd: function (map) {
		L.Polyline.prototype.onAdd.call(this, map);

		if (this.options.autoStart) {
			this.start();
		}
	},
	
	start: function(){
		this._step();
	},
	
	stop: function(){
		if ( this._timer ) clearTimeout( this._timer );
	},
	
	finish: function(){
		this.stop();
		this._progress = 1;
		this._offset = this._progress * this._totalLength;
		this._path.setAttribute( "stroke-dashoffset", -(this._offset - this._tracerLength) );
	},
	
	_step: function(){
		var self = this,
			speed = this.options.interval;
			
		if ( !this._totalLength ) this._totalLength = this._path.getTotalLength();
		this._offset += this.options.distance / this._metersPerPixel;
		this._progress = this._offset / this._totalLength;

		this._path.setAttribute( "stroke-dashoffset", -(this._offset - this._tracerLength) );
		
		this._timer = setTimeout(function(){
			if ( self._progress >= 1 ){
				self._progress = 1;
				self.options.onEnd.apply(self, Array.prototype.slice.call(arguments));
			} else {
				self._step();
			}
		}, speed);
	},
	
	_getTotalDistance: function(){
		var i, len, dist = 0;
		for ( i = 0, len = this._latlngs.length - 1; i < len; i++ ){
			dist += this._latlngs[i].distanceTo( this._latlngs[i+1] );
		}
		return dist;
	},
	
	_getTracerLength: function(){
		if ( !this._totalLength ) this._totalLength = this._path.getTotalLength();
		if ( typeof this.options.length == "string" ){
			var pct = parseFloat( this.options.length.split("%")[0] );
			return this._totalLength * ( pct / 100 );
		}
		return this.options.length;
	},
	
	_updatePath: function(){
		L.Polyline.prototype._updatePath.call(this);
		
		this._totalLength = this._path.getTotalLength();
		this._tracerLength = this._getTracerLength();
		this._metersPerPixel = this._totalDistance / this._totalLength;
		this._offset = this._progress * this._totalLength;
		this._path.setAttribute( "stroke-dasharray", this._tracerLength + " " + this._totalLength );
		this._path.setAttribute( "stroke-dashoffset", -(this._offset - this._tracerLength) );
	}		
	
});

L.polylineTracer = function(latlngs, options){
	return new L.PolylineTracer(latlngs,options);
};