const fs = require('fs')
const lodePng = require('lodepng')

const pngToMonoLiner = require('./lib/png-mono-liner')
const {
  lineOutput,
  setup,
  feedAndCut,
  primaryBurnSpeed,
  secondaryBurnSpeed
} = require('./lib/util')

const init = options => {
  options = Object.assign({}, options, { debug: false, logger: console })

  return async function(png) {
    if (options.debug) options.logger.info('********** Print Job Initiated *************')
    const startTime = Date.now()

    let lines = []

    const pngRGB = await lodePng.decode(png)
    if (options.debug) options.logger.info('LODEPNG Read', Date.now() - startTime)

    const printer = fs.createWriteStream('/dev/usb/lp0')
    if (options.debug) options.logger.info('USB Write Stream Opened', Date.now() - startTime)

    const onLine = line => {
      lines.push(line)
    }

    pngToMonoLiner(pngRGB, onLine, function() {
      if (options.debug) options.logger.info('pngToMonoLiner Completed ', Date.now() - startTime)

      const transformedLines = lines.map(line => lineOutput(line))

      const mainBody = [].concat.apply([], transformedLines)
      if (options.debug) options.logger.info('Main Body Transformed', Date.now() - startTime)

      const primary = primaryBurnSpeed(500)
      if (options.debug) options.logger.info('Primary Burn Speed Generated', Date.now() - startTime)

      const secondary = secondaryBurnSpeed(120)
      if (options.debug) options.logger.info('Secondary Burn Speed Generated', Date.now() - startTime)

      const job = Buffer.from(
        primary.concat(secondary, setup, mainBody, feedAndCut)
      )
      if (options.debug) options.logger.info('Entire payload spooled', Date.now() - startTime)
      printer.write(job)
      if (options.debug) options.logger.info('Job Written to Printer', Date.now() - startTime)
      printer.end()
      if (options.debug) options.logger.info('End', Date.now() - startTime)
      return true
    })
  }
}

module.exports = init
