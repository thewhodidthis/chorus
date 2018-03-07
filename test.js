import 'cutaway'
import { assert, report } from 'tapeless'
import trigger from './index.mjs'

window.AudioContext = window.AudioContext || window.webkitAudioContext

const { ok, notOk, equal } = assert

const t1 = trigger(undefined, {})

equal(typeof t1, 'function', 'got lambda on init', 'will default')

const t2 = trigger()

ok(t2, null, 'will toggle')
ok(t2(), 'is on')
notOk(t2(), 'is off')

report()
