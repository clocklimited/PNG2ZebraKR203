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
  console.log('********** Print Job Initiated *************')
  const startTime = Date.now()

  let lines = []

  const pngRGB = UPNG.decode(png)
  console.log('UPNG Read', Date.now() - startTime)

  const printer = fs.createWriteStream('/dev/usb/lp0')
  console.log('USB Write Stream Opened', Date.now() - startTime)

  const onLine = line => {
    lines.push(line)
  }

  pngToMonoLiner(pngRGB, onLine, function() {
    console.log('pngToMonoLiner Completed ', Date.now() - startTime)

    const transformedLines = lines.map(line => lineOutput(line))

    const mainBody = [].concat.apply([], transformedLines)
    console.log('Main Body Transformed', Date.now() - startTime)

    const primary = primaryBurnSpeed(500)
    console.log('Primary Burn Speed Generated', Date.now() - startTime)

    const secondary = secondaryBurnSpeed(120)
    console.log('Secondary Burn Speed Generated', Date.now() - startTime)

    const job = Buffer.from(
      primary.concat(secondary, setup, mainBody, feedAndCut)
    )
    console.log('Entire payload spooled', Date.now() - startTime)
    printer.write(job)
    console.log('Job Written to Printer', Date.now() - startTime)
    printer.end()
    console.log('End', Date.now() - startTime)
    return true
  })
}
