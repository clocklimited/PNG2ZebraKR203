# PNG to Zebra KR203 Printer

Reads a PNG and outputs a stream of printer commands for the Zebra KR203

## Usage

Before using this tool you must install the printer using the OS Printer Manager or the [Cups interface](https://support.zebra.com/cpws/docs/cups/cups_driver1_4_install.pdf) which runs on http://localhost:631

KR203 Kiosk printer doesn't support the label printer protocols provided by CUP. This will use as RAW device.

```
  const printer = require('png-to-zebra-ak203')
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
