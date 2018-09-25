# PNG to Zebra AK203 Printer

Reads a PNG and outputs a stream of printer commands for the Zebra AK203

## Usage

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
