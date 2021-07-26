'use strict';

const Logger = require('@liqd-js/logger');
const Client_JSONRPC = require('@liqd-js/client-jsonrpc');

module.exports = class WebergencyLogger extends Logger
{
    #queue = []; #rpc_client;

    constructor()
    {
        super();

        this.#rpc_client = new Client_JSONRPC( 'wss://endpoint1.logger.webergency.com' );

        this.pipe({ log: this.#log.bind( this )});
    }

    #log( log )
    {
        if( log.data.length > 2 ){ throw 'Log supports single message and one data object' }
        if( typeof log.data[0] !== 'string' ){ throw 'Log needs a message' }
        
        let webergency_log = 
        {
            timestamp   : log.timestamp,
            level       : log.level,
            meta        : log.meta,
            message     : log.data[0],
            data        : log.data[1]
        }

        !webergency_log.meta && delete webergency_log.meta;
        !webergency_log.data && delete webergency_log.data;

        //this.#queue.push( webergency_log );

        this.#rpc_client.call( 'log', webergency_log ).then( console.log );
    }
}