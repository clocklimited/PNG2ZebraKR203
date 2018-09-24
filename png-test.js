const {
  lineOutput,
  setup,
  feedAndCut,
  primaryBurnSpeed,
  secondaryBurnSpeed
} = require('./lib/util')

const fs = require('fs')
const PNG = require('pngjs').PNG

const Color = require('color')

const data = fs.readFileSync('./Test.a.png')
const png = PNG.sync.read(data)

const lines = []
for (let y = 0; y < png.height; y += 1) {
  const line = []
  for (let x = 0; x < png.width; x += 8) {
    const pixelPos = (y * png.width + x) * 4
    const byteSlice = png.data.slice(pixelPos, pixelPos + 8 * 4)
    let byte = 0
    let binaryPos = 0
    for (let i = 0; i < byteSlice.length; i += 4) {
      const rgb = [...byteSlice.slice(i, i + 3)]
      const luminosity = Color.rgb(rgb).luminosity()
      if (luminosity < 0.5) {
        byte += 1 << (7 - binaryPos)
      }
      binaryPos += 1
    }
    line.push(byte)
  }
  lines.push(line)
}

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
process.stdout.write(job)
