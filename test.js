import 'cutaway'
import { assert, report } from 'tapeless'
import trigger from './index.es'

window.AudioContext = window.AudioContext || window.webkitAudioContext

const { ok, equal } = assert

const t1 = trigger(undefined, {})

equal(typeof t1, 'function', 'got lambda on init', 'will default')

const t2 = trigger()

let isOn = false

isOn = t2()
ok(isOn, 'is on', 'will toggle')

isOn = t2()
ok(!isOn, 'is off')

report()
