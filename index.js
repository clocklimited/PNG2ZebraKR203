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

  console.log('**********Printer reached *************\n**************************************')
  const startTime = Date.now()
  const png = PNG.sync.read(fileData)
  let lines = []
  console.log('PNG Read', Date.now() - startTime)

  console.log('Buffer Created', Date.now() - startTime)
  const printer = fs.createWriteStream('/dev/usb/lp0')
  console.log('Connected to printer', Date.now() - startTime)
  console.log('Write Job Header', Date.now() - startTime)


  const onLine = line => {
    lines.push(line)
  }

  pngToMonoLiner(png, onLine, function () {
    console.log('Main payload spooled', Date.now() - startTime)


    const job = Buffer.from([
      ...primaryBurnSpeed(500),
      ...secondaryBurnSpeed(120),
      ...setup,
      ...lines.reduce(
        (collection, line) => collection.concat(...lineOutput(line)),
        []
      ),
      ...feedAndCut
    ])

    console.log('Main payload spooled', Date.now() - startTime)
    printer.write(job)
    console.log('Cut', Date.now() - startTime)
    printer.end()
    console.log('End', Date.now() - startTime)
    return true
  })
}
