# PNG to Zebra KR203 Printer

Reads a PNG and outputs a stream of printer commands for the Zebra KR203

## Usage

KR203 Kiosk printer doesn't support the label printer protocols provided by CUP. This will use as RAW device.

```
  const printer = require('png-to-zebra')
  const gm = require('gm').subClass({ imageMagick: true })

    gm(buffer)
      .resize(640)
      .density(300)
      .threshold('50%')
      .flatten()
      .toBuffer('PNG'
        , function (err, buffer) {
        if (err) console.log(err)
        printer(buffer)
      })
```
