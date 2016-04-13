

L.AnimatedLine = L.Polyline.extend({
  options: {
    // meters
    distance: 200,
    // ms
    interval: 250,
    // animate on add?
    autoStart: true,
    // callback onend
    onEnd: function(){},
    clickable: true,
    maxDuration: 0
  },

  initialize: function (latlngs, options) {
  	this._totalDistance = this._getTotalDistance(latlngs);//this._getTotalDistance(latlngs);
      // Chunk up the lines into options.distance bits
    this.options.distance = 100;
    this.options.interval = 50;
    if (options.maxDuration) {
      this._maxFrames = Math.round(options.maxDuration / 20); // maximum framerate of 20ms
      if (this._totalDistance / this.options.distance > this._maxFrames) {
        this.options.interval = 20;
        this.options.distance = Math.round(this._totalDistance/this._maxFrames);
      }
    }
    this._coords = this._chunk(latlngs);
    
    this.finished = false;
    L.Polyline.prototype.initialize.call(this, latlngs, options);
  },

  _getTotalDistance: function(latlngs) {
    var i,
        len = latlngs.length,
        totalDist = 0;

    for (i=1;i<len;i++) {
      var cur = latlngs[i-1],
          next = latlngs[i],
          dist = cur.distanceTo(next),
          factor = this.options.distance / dist,
          dLat = factor * (next.lat - cur.lat),
          dLng = factor * (next.lng - cur.lng);
      totalDist += dist;
    }

    return totalDist;
  },

  // Breaks the line up into tiny chunks (see options) ONLY if CSS3 animations
  // are not supported.
  _chunk: function(latlngs) {
    var i,
        len = latlngs.length,
        chunkedLatLngs = [],
        totalDist = 0;

    for (i=1;i<len;i++) {
      var cur = latlngs[i-1],
          next = latlngs[i],
          dist = cur.distanceTo(next),
          factor = this.options.distance / dist,
          dLat = factor * (next.lat - cur.lat),
          dLng = factor * (next.lng - cur.lng);
      this._totalDistance += dist;
      if (dist > this.options.distance) {
        while (dist > this.options.distance) {
          cur = new L.LatLng(cur.lat + dLat, cur.lng + dLng);
          dist = cur.distanceTo(next);
          chunkedLatLngs.push(cur);
        }
      } else {
        chunkedLatLngs.push(cur);
      }
    }

    return chunkedLatLngs;
  },

  onAdd: function (map) {
    L.Polyline.prototype.onAdd.call(this, map);

    // Start animating when added to the map
    if (this.options.autoStart) {
      this.start();
    }
  },

  animate: function() {
    var self = this,
        len = this._coords.length,
        speed = this.options.interval;

    // Normalize the transition speed from vertex to vertex
    if (this._i < len) {
      speed = this._coords[this._i-1].distanceTo(this._coords[this._i]) / this.options.distance * this.options.interval;
    }

    // Move to the next vertex
    this.setLatLngs(this._coords.slice(0,this._i+1));
    this._i++;

    // Queue up the animation ot the next next vertex
    this._tid = setTimeout(function(){
      if (self._i === len) {
      	self.finished = true;
        self.options.onEnd.apply(self, Array.prototype.slice.call(arguments));
      } else {
        self.animate();
      }
    }, speed);
  },

  // Start the animation
  start: function() {
    if (!this._i) {
      this._i = 1;
    }

    this.animate();
  },

  // Stop the animation in place
  stop: function() {
    if (this._tid) {
      clearTimeout(this._tid);
    }
  },
  
  finish: function() {
  	if (this._tid) {
      clearTimeout(this._tid);
    }
    this.finished = true;
    this.setLatLngs(this._coords);
    this.options.onEnd.apply(this, Array.prototype.slice.call(arguments));
  }
});

L.animatedLine = function (latlngs, options) {
  return new L.AnimatedLine(latlngs, options);
};