// Copyright (C) 2025, Bitcoin Nova Developers
//
// Please see the included LICENSE file for more information.

import { Platform } from 'react-native';

import { MixinLimit, MixinLimits, Daemon } from 'turtlecoin-wallet-backend';

import {
    derivePublicKey, generateKeyDerivation, generateRingSignatures,
    deriveSecretKey, generateKeyImage, checkRingSignature,
} from './NativeCode';

const Config = new function() {
    /**
     * If you can't figure this one out, I don't have high hopes
     */
    this.coinName = 'Bitcoin Nova';
    this.coinNameSentry = 'bitcoinnova';

    /**
     * Prefix for URI encoded addresses
     */
    this.uriPrefix = 'bitcoinnova://';

    /**
     * How often to save the wallet, in milliseconds
     */
    this.walletSaveFrequency = 120 * 1000;

    /**
     * The amount of decimal places your coin has, e.g. Bitcoin Nova has six
     * decimals
     */
    this.decimalPlaces = 6;

    /**
     * The address prefix your coin uses - you can find this in CryptoNoteConfig.h.
     * In Bitcoin Nova, this converts to E...
     */
    this.addressPrefix = 78;

    /**
     * Request timeout for daemon operations in milliseconds
     */
    this.requestTimeout = 30 * 1000;

    /**
     * The block time of your coin, in seconds
     */
    this.blockTargetTime = 120;

    /**
     * How often to process blocks, in millseconds
     */
    this.syncThreadInterval = 4;

    /**
     * How often to update the daemon info, in milliseconds
     */
    this.daemonUpdateInterval = 60 * 1000;

    /**
     * How often to check on locked transactions
     */
    this.lockedTransactionsCheckInterval = 120 * 1000;

    /**
     * The amount of blocks to process per 'tick' of the mainloop. Note: too
     * high a value will cause the event loop to be blocked, and your interaction
     * to be laggy.
     */
    this.blocksPerTick = 100;

    /**
     * Your coins 'ticker', generally used to refer to the coin, i.e. 1234 BTN
     */
    this.ticker = 'BTN';

    /**
     * Most people haven't mined any blocks, so lets not waste time scanning
     * them
     */
    this.scanCoinbaseTransactions = false;

    this.autoOptimize = false;

    /**
     * The minimum fee allowed for transactions, in ATOMIC units
     */
    this.minimumFee = 10000;

    /**
     * Mapping of height to mixin maximum and mixin minimum
     */
    this.mixinLimits = new MixinLimits([
        /* Height: 0, minMixin: 3, maxMixin: 3, defaultMixin: 3 */
        new MixinLimit(0, 3, 3, 3),

        /* At height of 440000 */
        new MixinLimit(440000, 0, 100, 100),

        /* At height of 620000 */
        new MixinLimit(620000, 2, 7, 7),
        
        /* At height of 712160 */
        new MixinLimit(712160, 1, 3, 3),        
    ], 3 /* Default mixin */);

    /**
     * The length of a standard address for your coin
     */
    this.standardAddressLength = 95;

    /**
     * The length of an integrated address for your coin - It's the same as
     * a normal address, but there is a paymentID included in there - since
     * payment ID's are 64 chars, and base58 encoding is done by encoding
     * chunks of 8 chars at once into blocks of 11 chars, we can calculate
     * this automatically
     */
    this.integratedAddressLength = 95 + ((64 * 11) / 8);

    /**
     * Use our native func instead of JS slowness
     */
    this.derivePublicKey = Platform.OS === 'ios' ? undefined : derivePublicKey;

    /**
     * Use our native func instead of JS slowness
     */
    this.generateKeyDerivation = Platform.OS === 'ios' ? undefined : generateKeyDerivation;

    /**
     * Use our native func instead of JS slowness
     */
    this.generateRingSignatures = Platform.OS === 'ios' ? undefined : generateRingSignatures;

    /**
     * Use our native func instead of JS slowness
     */
    this.deriveSecretKey = Platform.OS === 'ios' ? undefined : deriveSecretKey;

    /**
     * Use our native func instead of JS slowness
     */
    this.generateKeyImage = Platform.OS === 'ios' ? undefined : generateKeyImage;

    /**
     * Use our native func instead of JS slowness
     */
    this.checkRingSignatures = Platform.OS === 'ios' ? undefined: checkRingSignature;

    /**
     * Memory to use for storing downloaded blocks - 10MB
     */
    this.blockStoreMemoryLimit = 1024 * 1024 * 10;

    /**
     * Amount of blocks to request from the daemon at once
     */
    this.blocksPerDaemonRequest = 100;

    /**
     * Unix timestamp of the time your chain was launched.
     *
     * Note - you may want to manually adjust this. Take the current timestamp,
     * take away the launch timestamp, divide by block time, and that value
     * should be equal to your current block count. If it's significantly different,
     * you can offset your timestamp to fix the discrepancy
     */
    this.chainLaunchTimestamp = new Date(1000 * 1508958688);

    /**
     * Fee to take on all transactions, in percentage
     */
    this.devFeePercentage = 0.0;

    /**
     * Address to send dev fee to
     */
    this.devFeeAddress = 'ECVVceHwZQaNg7BNuAjJXhbQFJnLcmxyxJ7CXNBnb2M5YUsVMKaAD8ceNHiGSqdS7hJWKLEC38kFeWU6F5dVpLm2QPcLWdj';

    /**
     * Base url for price API
     *
     * The program *should* fail gracefully if your coin is not supported, or
     * you just set this to an empty string. If you have another API you want
     * it to support, you're going to have to modify the code in Currency.js.
     */
    this.priceApiLink = 'https://api.coingecko.com/api/v3/simple/price';
    this.coinNamePriceApi = 'bitcoin-nova';
    
    /**
     * Default daemon to use.
     */
    this.defaultDaemon = new Daemon('superblockchain.con-ip.com', 19031, false, false);

    /**
     * A link to where a bug can be reported for your wallet. Please update
     * this if you are forking, so we don't get reported bugs for your wallet...
     *
     */
    this.repoLink = 'https://github.com/BitcoinNova/bitcoinnova-mobile-wallet/issues';

    /**
     * This only controls the name in the settings screen.
     */
    this.appName = 'Bitcoin Nova Mobile Wallet';

    /**
     * Slogan phrase during wallet CreateScreen
     */
    this.sloganCreateScreen = 'Your Bitcoin Nova Mobile Wallet!';

    /**
     * Displayed in the settings screen
     */
    this.appVersion = 'v1.2.3';

    /**
     * Base URL for us to chuck a hash on the end, and find a transaction
     */
    this.explorerBaseURL = 'https://bitcoinnova.github.io/bitcoinnova-explorer/?hash=';
    this.explorerBaseURLblockchain = '#blockchain_transaction';

    /**
     * A link to your app on the Apple app store. Currently blank because we
     * haven't released for iOS yet...
     */
    this.appStoreLink = 'https://github.com/BitcoinNova/bitcoinnova-mobile-wallet/releases';

    /**
     * A link to your app on the google play store
     */
    this.googlePlayLink = 'https://github.com/BitcoinNova/bitcoinnova-mobile-wallet/releases';

    /**
     * A url to fetch node info from
     */
    this.nodeListURL = 'https://raw.githubusercontent.com/BitcoinNova/bitcoinnova-mobile-nodes-json/refs/heads/master/bitcoinnova-mobile-nodes.json';
};

module.exports = Config;
