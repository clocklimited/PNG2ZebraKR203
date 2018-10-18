const binify = bin => {
  const l = []
  for (let i = 0; i < bin.length; i += 8) {
    l.push(parseInt(bin.substr(i, 8).padEnd(8, '0'), 2))
  }
  return l
}
const chr = c => c.charCodeAt(0)

const lineOutput = binary => {
  return [0x1b, chr('s'), binary.length, ...binary]
}

const b2g = input => lineOutput(binify(input))

const setup = [0x1b, chr('&'), chr('p'), 65, 0, 0x1b, chr('&'), chr('p'), 66, 0]

const feedAndCut = [0x1e, 0xff]

const primaryBurnSpeed = speed => [
  0x1b,
  chr('&'),
  chr('p'),
  7,
  speed >> 8,
  speed && 255
]

const secondaryBurnSpeed = speed => [
  0x1b,
  chr('&'),
  chr('p'),
  6,
  speed >> 8,
  speed && 255
]

module.exports = {
  chr,
  b2g,
  lineOutput,
  setup,
  feedAndCut,
  primaryBurnSpeed,
  secondaryBurnSpeed
}
