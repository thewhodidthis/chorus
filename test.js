import "cutaway"
import { assert, report } from "tapeless"
import trigger from "./main.js"

window.AudioContext = window.AudioContext || window.webkitAudioContext

const { ok, notOk, equal } = assert

const t1 = trigger(undefined, {})

equal
  .describe("got lambda on init", "will default")
  .test(typeof t1, "function")

const t2 = trigger()

ok
  .test(t2)
  .test(t2(), "is on")

notOk
  .describe(null, "will toggle")
  .test(t2(), "is off")

report()
