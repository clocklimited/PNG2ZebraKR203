#!/usr/bin/env node
const {
  lineOutput,
  setup,
  feedAndCut,
  primaryBurnSpeed,
  secondaryBurnSpeed
} = require('./lib/util')

const args = require('args')
const pngToMonoLiner = require('./lib/png-mono-liner')
const fs = require('fs')
const PNG = require('pngjs').PNG

args.option('input', 'PNG filename. STDIN will be used if omitted.')

const flags = args.parse(process.argv)
const filename = flags.input || 0

const data = fs.readFileSync(filename)
const png = PNG.sync.read(data)

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
