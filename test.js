'use strict'

window.AudioContext = window.AudioContext || window.webkitAudioContext

const kpow = require('kpow')
const test = require('tape')
const trigger = require('./')

kpow()

test('will default', (t) => {
  const toggle = trigger(undefined, {})

  t.equals(typeof toggle, 'function', 'got lambda on init')
  t.end()
})

test('will toggle', (t) => {
  const toggle = trigger()

  let isOn = false

  isOn = toggle()
  t.ok(isOn, 'is on')

  isOn = toggle()
  t.notOk(isOn, 'is off')

  t.end()
})
