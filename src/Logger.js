// Copyright (C) 2025, Bitcoin Nova Developers
//
// Please see the included LICENSE file for more information.

import moment from 'moment';

export class Logger {
    constructor() {
        this.logs = [];
        this.MAX_LOG_SIZE = 100;
    }

    addLogMessage(message) {
        const index = this.logs.push(`[${moment().format('HH:mm:ss')}]: ${message}`);

        console.log(this.logs[index-1]);

        if (this.logs.length > this.MAX_LOG_SIZE) {
            this.logs.shift();
        }
    }

    getLogs() {
        return this.logs;
    }
}
