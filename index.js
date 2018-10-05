#!/usr/bin/env node
const {
  lineOutput,
  setup,
  feedAndCut,
  primaryBurnSpeed,
  secondaryBurnSpeed
} = require('./lib/util')

const fs = require('fs')

const pngToMonoLiner = require('./lib/png-mono-liner')
const PNG = require('pngjs').PNG

module.exports = function(fileData) {
  console.log(4634, fileData)
  const png = PNG.sync.read(fileData)

  const job = Buffer.from([
    ...primaryBurnSpeed(500),
    ...secondaryBurnSpeed(120),
    ...setup,
    ...pngToMonoLiner(png).reduce(
      (collection, line) => collection.concat(...lineOutput(line)),
      []
    ),
    ...feedAndCut
  ])
  console.log(93523, job)
  const printer = fs.createWriteStream('/dev/usb/lp0')
  job.pipe(printer)
}
