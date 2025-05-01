// Copyright (C) 2025, Bitcoin Nova Developers
//
// Please see the included LICENSE file for more information.

import * as Sentry from '@sentry/react-native';

import * as _ from 'lodash';

import Config from './Config';

/* Manually comparing to Bitcoin Nova to try and prevent getting errors reported
   for forks... */
/* DO NOT CHANGE THIS LINE WITHOUT ALSO ALTERING THE Sentry.config() LINE - See readme and sentry docs. */
const sentryIsEnabled = !__DEV__ && Config.coinNameSentry === 'bitcoinnova';

export function reportCaughtException(err) {
    /* Sentry doesn't properly report arbitary objects. Convert to string if
       it ain't a string or an error. */
    if (!_.isString(err) && !(err instanceof Error)) {
        err = JSON.stringify(err, null, 4);
    }

    if (sentryIsEnabled) {
        try {
            Sentry.captureException(err);
        } catch (e) {
        }
    }
}

export function initSentry() {
    if (sentryIsEnabled) {
        /* CHANGE THIS IF YOU ARE FORKING! */
        Sentry.init({
          dsn: 'https://2e5e93080b8a6919260308a14d41a66e@o4509248099909632.ingest.de.sentry.io/4509248101220432',
        });

        Sentry.setRelease('org.bitcoinnova.mobileapp-' + Config.appVersion);
    }
}
