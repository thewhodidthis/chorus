'use strict';

const trigger = ({ context = new AudioContext(), param = context.createGain() } = {}) => {
  const trip = (param instanceof AudioParam && param) || param.gain;

  const play = ({ target = 1, attack = 0.25, decay = 0.5, sustain = 1 } = {}) => {
    const { currentTime } = context;

    trip.cancelScheduledValues(currentTime);
    trip.value = target;
    trip.setValueAtTime(0, currentTime);
    trip.linearRampToValueAtTime(target, currentTime + attack);
    trip.linearRampToValueAtTime(target * sustain, currentTime + attack + decay);

    return true
  };

  const stop = ({ target = 0, release = 0.5 } = {}) => {
    const { currentTime } = context;

    trip.cancelScheduledValues(0);
    trip.setValueAtTime(trip.value, currentTime);
    trip.linearRampToValueAtTime(target, currentTime + release);

    return false
  };

  let isBusy = false;

  return (o) => {
    isBusy = isBusy ? stop(o) : play(o);

    return isBusy
  }
};

module.exports = trigger;
