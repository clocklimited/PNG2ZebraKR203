# PNG to Zebra KR203 Printer

Reads a PNG and outputs a stream of printer commands for the Zebra KR203

## Usage

Before using this tool you must install the printer using the OS Printer Manager or the [Cups interface](https://support.zebra.com/cpws/docs/cups/cups_driver1_4_install.pdf) which runs on http://localhost:631

KR203 Kiosk printer doesn't support the label printer protocols provided by CUP. This will use as RAW device.

```
  Usage: png2zebra [options] [command]

  Commands:
    help     Display help
    version  Display version

  Options:
    -h, --help     Output usage information
    -i, --input    PNG filename. STDIN will be used if omitted.
    -v, --version  Output the version number
```

## Examples

Filename - Test.png must be a monochrome image

```
png2zebra -i ./Test.png | lpr -l -P Zebra_Technologies_ZTC_KR203
```

Convert a PNG to monochrome and print

```
convert -resize 640 -monochrome Test.png png:- | png2zebra | lpr -l -P Zebra_Technologies_ZTC_KR203
```

PDF to Monochrome PNG to printer

```
convert -density 600 -resize 640 -monochrome Test.pdf png:- | png2zebra | lpr -l -P Zebra_Technologies_ZTC_KR203
```

Landscape Image URL

```
curl https://pbs.twimg.com/profile_images/1777743610/Bearded_400x400.jpg | convert jpeg:- -resize 640 -colorspace Gray -ordered-dither h4x4a png:- | png2zebra | lpr -l -P Zebra_Technologies_ZTC_KR203
```
