#!/usr/bin/env node
const {
  lineOutput,
  setup,
  feedAndCut,
  feed,
  cut,
  primaryBurnSpeed,
  secondaryBurnSpeed
} = require('./lib/util')

const fs = require('fs')

const pngToMonoLiner = require('./lib/png-mono-liner')
const PNG = require('pngjs').PNG

module.exports = function(fileData) {
  
  console.log('Printer reached \n\n\n\n\n\n***********************\n\n\n\n\n\n')
  const startTime = Date.now() 
  const png = PNG.sync.read(fileData)
  console.log('PNG Read', Date.now() - startTime)
  
  const job = Buffer.from([
    ...primaryBurnSpeed(500),
    ...secondaryBurnSpeed(120),
    ...setup,
    ...feed
  ])
  console.log('Buffer Created', Date.now() - startTime)
  const printer = fs.createWriteStream('/dev/usb/lp0')
  console.log('Connected to printer', Date.now() - startTime)
  printer.write(job)
  console.log('Write Job Header', Date.now() - startTime)
  pngToMonoLiner(png).reduce((collection, line) => printer.write(Buffer.from([lineOutput(line)])))
  console.log('Main payload spooled', Date.now() - startTime)
  const cutJob = Buffer.from([
    ...cut
  ])
  console.log('Main payload spooled', Date.now() - startTime)
  printer.write(cutJob)
  console.log('Cut', Date.now() - startTime)
  printer.end()
  console.log('End', Date.now() - startTime)
  return true
}
