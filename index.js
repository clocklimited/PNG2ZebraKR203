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
const UPNG = require('upng-js')

module.exports = function(png) {
  console.log(
    '**********Printer reached *************\n**************************************'
  )
  const startTime = Date.now()

  const pngRGB = UPNG.decode(png.data)
  let lines = []
  console.log('PNG Read', Date.now() - startTime)

  console.log('Buffer Created', Date.now() - startTime)
  const printer = fs.createWriteStream('/dev/usb/lp0')
  console.log('Connected to printer', Date.now() - startTime)
  console.log('Write Job Header', Date.now() - startTime)

  const onLine = line => {
    lines.push(line)
  }

  pngToMonoLiner(pngRGB, onLine, function() {
    console.log('Main payload spooled', Date.now() - startTime)

    const transformedLines = lines.map(line => lineOutput(line))

    const mainBody = [].concat.apply([], transformedLines)

    const primary = primaryBurnSpeed(500)

    const secondary = secondaryBurnSpeed(120)

    const job = Buffer.from(
      primary.concat(secondary, setup, mainBody, feedAndCut)
    )

    console.log('Main payload spooled', Date.now() - startTime)
    printer.write(job)
    console.log('Cut', Date.now() - startTime)
    printer.end()
    console.log('End', Date.now() - startTime)
    return true
  })
}
