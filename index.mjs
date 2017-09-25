const createTrigger = (audio, param) => {
  const play = (target = 1, attack = 0.5, decay = 0.5, sustain = 1) => {
    const time = audio.currentTime

    param.cancelScheduledValues(time)
    param.value = target
    param.setValueAtTime(0, time)
    param.linearRampToValueAtTime(target, time + attack)
    param.linearRampToValueAtTime(target * sustain, time + attack + decay)

    return true
  }

  const stop = (release = 0.5) => {
    const time = audio.currentTime

    param.cancelScheduledValues(0)
    param.setValueAtTime(param.value, time)
    param.linearRampToValueAtTime(0, time + release)

    return false
  }

  let busy = false

  return function next() {
    busy = (busy ? stop : play).apply(null, arguments)
  }
}

export default createTrigger
