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
  const printer = fs.createWriteStream('/dev/usb/lp0')
  job.pipe(printer)
}
