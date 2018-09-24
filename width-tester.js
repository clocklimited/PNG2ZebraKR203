const { chr, b2g, setup, feedAndCut } = require('./lib/util')

const makeLine = (mark, size) => {
  console.log(mark)
  return [...Array(mark).fill(0), ...Array(size).fill(1)]
    .toString()
    .replace(/,/g, '')
}

let lines = []
const width = 620
const halfWidth = width / 2
for (let i = 1; i <= 1000; i++) {
  lines = [
    ...lines,
    ...b2g(makeLine(halfWidth + Math.round(Math.sin(i / 180) * halfWidth), 1))
  ]
}

// Burn Speed
// <ESC>&p<N1><N2>..<NX>

const job = Buffer.from([
  ...setup,
  ...[0x1b, chr('&'), chr('p'), 7, 0xf0],
  ...lines,
  ...feedAndCut
])

process.stdout.write(job)

// node width-tester.js | lpr -l -P Zebra_Technologies_ZTC_KR203

// 7 Primary burn time 10..2600 560 2 None
