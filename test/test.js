const WebergencyLogger = require('../lib/logger');

const logger = new WebergencyLogger();

for( let i = 0; i < 1; ++i )
{
    logger.meta({ i, type: 'error' }).notice( 'janko', { hrasko: 'hrasko' });
}