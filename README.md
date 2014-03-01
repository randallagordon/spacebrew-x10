# spacebrew-x10 ##############################################################

Route X10 events via Spacebrew

## CLI Utility Usage

The CLI utility is a quick and easy way to connect X10 devices to the public Spacebrew admin interface.

```sh
$ npm i -g spacebrew-x10
$ spacebrew-x10 A 1 16

[_onOpen:Spacebrew] Spacebrew connection opened, client name is: X10 -> Spacebrew
Connecting House Code A - Units 1 to 16
Spacebrew Message: House Code A - 16 true
      X10 Message: ON
Spacebrew Message: House Code A - 16 false
      X10 Message: OFF
```

## Module Usage Example ###################################################################

```js
var sbx10 = require("spacebrew-x10");

// Connect to Spacebrew, passing an onOpen handler
sbx10.connect(function () {

  // Add ranges by passing a House Code ("A" through "P") and lower & upper Unit Code bounds
  sbx10.addRange("A", 1, 16);

});
```

And over in the Admin interface you'll see:

![Screenshot of Spacebrew Admin running example code](https://github.com/randallagordon/spacebrew-x10/raw/master/img/readme-example.png "Screenshot of Spacebrew Admin running example code")

By default this will create a connection to the public [Spacebrew
Admin](http://spacebrew.github.io/spacebrew/admin/admin.html?server=sandbox.spacebrew.cc)
interface.

To connect to another server: `sbx10.connect({ server: "http://localhost/" })`

To use a different name and description: `sbx10.connect({ name: "Bob", description: "Bob's X10 Disco" })`

## CHANGELOG ######################################################################

### v0.0.1

 * First release, woohoo!

## TODO ######################################################################

 * 

## LICENSE ####################################################################

MIT
