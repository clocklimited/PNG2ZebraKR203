const Color = require('color')

const pngToMonoLines = (png, onLine, callback) => {
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
    onLine(line)
  }
  callback()
}

module.exports = pngToMonoLines
