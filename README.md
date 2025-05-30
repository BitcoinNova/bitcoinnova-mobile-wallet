# Bitcoin Nova Mobile Wallet - A mobile, native Bitcoin Nova Wallet

![BitcoinNova](https://github.com/BitcoinNova/brand/blob/master/logo/wordmark/bitcoinnova_wordmark_ubuntu.png "BitcoinNova")

[![GitHub issues](https://img.shields.io/github/issues/BitcoinNova/bitcoinnova-mobile-wallet?label=Issues)](https://github.com/BitcoinNova/bitcoinnova-mobile-wallet/issues)
![Version](https://img.shields.io/github/v/release/BitcoinNova/bitcoinnova-mobile-wallet)

### Initial Setup

* `cd bitcoinnova-mobile-wallet`
* `yarn install`

### Running

* `node --max-old-space-size=8192 node_modules/react-native/local-cli/cli.js start` (Just need to run this once to start the server, leave it running)
* `react-native run-android`

### Logging

`react-native log-android`

### Creating a release

You need to bump the version number in:

* `src/Config.js` - `appVersion`
* `android/app/build.gradle` - `versionCode` and `versionName`
* `package.json` - `version` - Not strictly required
* Update user agent in `android/app/src/main/java/com/tonchan/MainApplication.java` and `android/app/src/main/java/com/tonchan/BitcoinNovaModule.java`

Then either run `yarn deploy-android`, or:

`cd android`

#### Create an AAB
`./gradlew bundleRelease`

#### Create an APK
`./gradlew assembleRelease`

#### Deploy to device
`./gradlew installRelease`

### Integrating QR Codes or URIs

Bitcoin Nova Mobile Wallet supports two kinds of QR codes.

* Standard addresses / integrated addresses - This is simply the address encoded as a QR code.

* bitcoinnova:// URI encoded as a QR code.

Your uri must begin with `bitcoinnova://` followed by the address to send to, for example, `bitcoinnova://ECVVceHwZQaNg7BNuAjJXhbQFJnLcmxyxJ7CXNBnb2M5YUsVMKaAD8ceNHiGSqdS7hJWKLEC38kFeWU6F5dVpLm2QPcLWdj`

There are a few optional parameters.

* `name` - This is used to add you to the users address book, and identify you on the 'Confirm' screen. A name can contain spaces, and should be URI encoded.
* `amount` - This is the amount to send you. This should be specified in atomic units.
* `paymentid` - If not using integrated address, you can specify a payment ID. Specifying an integrated address and a payment ID is illegal.

An example of a URI containing all of the above parameters:

```
bitcoinnova://ECVVceHwZQaNg7BNuAjJXhbQFJnLcmxyxJ7CXNBnb2M5YUsVMKaAD8ceNHiGSqdS7hJWKLEC38kFeWU6F5dVpLm2QPcLWdj?amount=100000000&name=Starbucks%20Coffee&paymentid=537461726275636b7320436f6666656520202020202020202020202020202020
```

This would send `100 BTN` (100000000 in atomic units) to the address `ECVVceHwZQaNg7BNuAjJXhbQFJnLcmxyxJ7CXNBnb2M5YUsVMKaAD8ceNHiGSqdS7hJWKLEC38kFeWU6F5dVpLm2QPcLWdj`, using the name `Starbucks Coffee` (Note the URI encoding), and using a payment ID of `537461726275636b7320436f6666656520202020202020202020202020202020`

You can also just display the URI as a hyperlink. If a user clicks the link, it will open the app, and jump to the confirm screen, just as a QR code would function. (Provided all the fields are given)