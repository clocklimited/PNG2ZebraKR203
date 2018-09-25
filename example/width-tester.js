const { b2g, setup, feedAndCut } = require('../lib/util')

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

const job = Buffer.from([...setup, ...lines, ...feedAndCut])

process.stdout.write(job)

// node width-tester.js | lpr -l -P Zebra_Technologies_ZTC_KR203
