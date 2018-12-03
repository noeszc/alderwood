import config from 'server/config/main.config';

export function setEdgeControl(cache_control = null, profile = 0)
{
    if ((profile) === 1) {
        cache = config['cache-control']['debug'];
    } else if (config['cache-control'].hasOwnProperty(cache_control)) {
        cache = config['cache-control'][cache_control];
    } else {
        cache = config['cache-control']['default'];
    }

    // header(`edge-control: ${cache}`); ???
    return true;
}