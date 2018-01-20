'use strict';

var trigger = function (ref) {
  if ( ref === void 0 ) ref = {};
  var context = ref.context; if ( context === void 0 ) context = new AudioContext();
  var param = ref.param; if ( param === void 0 ) param = context.createGain();

  var trip = (param instanceof AudioParam && param) || param.gain;

  var play = function (ref) {
    if ( ref === void 0 ) ref = {};
    var target = ref.target; if ( target === void 0 ) target = 1;
    var attack = ref.attack; if ( attack === void 0 ) attack = 0.25;
    var decay = ref.decay; if ( decay === void 0 ) decay = 0.5;
    var sustain = ref.sustain; if ( sustain === void 0 ) sustain = 1;

    var currentTime = context.currentTime;

    trip.cancelScheduledValues(currentTime);
    trip.value = target;
    trip.setValueAtTime(0, currentTime);
    trip.linearRampToValueAtTime(target, currentTime + attack);
    trip.linearRampToValueAtTime(target * sustain, currentTime + attack + decay);

    return true
  };

  var stop = function (ref) {
    if ( ref === void 0 ) ref = {};
    var target = ref.target; if ( target === void 0 ) target = 0;
    var release = ref.release; if ( release === void 0 ) release = 0.5;

    var currentTime = context.currentTime;

    trip.cancelScheduledValues(0);
    trip.setValueAtTime(trip.value, currentTime);
    trip.linearRampToValueAtTime(target, currentTime + release);

    return false
  };

  var isBusy = false;

  return function (o) {
    isBusy = isBusy ? stop(o) : play(o);

    return isBusy
  }
};

module.exports = trigger;

