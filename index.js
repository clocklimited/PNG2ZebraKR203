#!/usr/bin/env node
const {
  lineOutput,
  setup,
  feedAndCut,
  primaryBurnSpeed,
  secondaryBurnSpeed
} = require('./lib/util')

const pngToMonoLiner = require('./lib/png-mono-liner')
const PNG = require('pngjs').PNG

export default fileData => {
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
  process.stdout.write(job)
}

