import Ember from 'ember';

export default Ember.Component.extend({
	m: 0.0, // min (0-60)
	h: 9.0, // hour (0-24) e.g. 9h - 17h = 8h

	timeStartTs: null,
	timeEndTs: null,

	test: Ember.on("init", function() {
		var self = this;

		// self.set("timeStartTs", Date.now());
		// self.set("timeEndTs", Date.now() + 100 * 1000);

		setInterval(function() {

			if (!self.get("timeStartTs") && !self.get("timeEndTs")) {
				return;
			}

			var currDiff = Date.now() - self.get("timeStartTs");
			var totalDiff = (self.get("timeEndTs") - self.get("timeStartTs")); // turn ms into min
			var ratio = (currDiff / totalDiff);
			ratio = Math.min(ratio, 1.0);

			self.set("isOver", ratio === 1.0);

			var ratioMinutes = ratio * 8 * 60;

			var mAdd = (ratioMinutes);
			var hAdd = (ratioMinutes / 60);

			self.set("m", mAdd);
			self.set("h", 9 + hAdd);
				

		}, 1000);
	}),

	hDeg: Ember.computed("h", "m", function() {
		return 360.0 * this.get("h") * (1.0 / 12.0);
	}),

	mDeg: Ember.computed("m", function() {
		return 360.0 * this.get("m") * (1.0 / 60.0);
	}),
});