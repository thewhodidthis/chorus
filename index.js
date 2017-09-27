'use strict';

var createTrigger = function (audio, param) {
  var play = function (target, attack, decay, sustain) {
    if ( target === void 0 ) target = 1;
    if ( attack === void 0 ) attack = 0.25;
    if ( decay === void 0 ) decay = 0.5;
    if ( sustain === void 0 ) sustain = 1;

    var time = audio.currentTime;

    param.cancelScheduledValues(time);
    param.value = target;
    param.setValueAtTime(0, time);
    param.linearRampToValueAtTime(target, time + attack);
    param.linearRampToValueAtTime(target * sustain, time + attack + decay);

    return true
  };

  var stop = function (release, target) {
    if ( release === void 0 ) release = 0.5;
    if ( target === void 0 ) target = 0;

    var time = audio.currentTime;

    param.cancelScheduledValues(0);
    param.setValueAtTime(param.value, time);
    param.linearRampToValueAtTime(target, time + release);

    return false
  };

  var busy = false;

  return function next() {
    // Not particularly fond of using `arguments`,
    // but for now save on the while loop traspiling rest params will introduce
    busy = (busy ? stop : play).apply(null, arguments);

    return busy
  }
};

module.exports = createTrigger;

