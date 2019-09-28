# Open All

## About

This module is a rough approximation of many languages `open` function which tries to open a file based on the scheme. This is, of course, a bad idea and should realistically never be done. However, becuse this pattern is common in non-nodejs languages, being able to see how it works can be useful for people learning how to exploit buggy code.

In other words,

**This code is intentionally bad. Do not use for anything other than educational purposes**

## Support

### URI

This module comes with a custom URI parser. If you're considering why such a parser would be needed when `node` has the `URL` constructor, I encourage you to take a closer look at it.

### open

This function is the titular `open-all` function. Currently it supports

 - FTP URIs
 - Base64 URIs (slightly custom, takes the form `base64://0123456789abcdefg`)
 - File URIs
 - HTTP(S?) URIs

It also has an options field which can be used to disable any of these. The corresponding values aare

 - `disableFTP: true`
 - `disableBase64: true`
 - `disableFile: true`
 - `disableHTTP: true`