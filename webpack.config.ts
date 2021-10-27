/* eslint import/no-nodejs-modules: off, import/no-default-export: off */

import { getWebpackConfig } from 'grumbler-scripts/config/webpack.config';
import type { WebpackConfig } from 'grumbler-scripts/config/types';

const FILE_NAME = 'universal-serialize';
const MODULE_NAME = 'universal-serialize';

export const WEBPACK_CONFIG : WebpackConfig = getWebpackConfig({
    filename:   `${ FILE_NAME }.js`,
    modulename: MODULE_NAME
});

export const WEBPACK_CONFIG_MIN : WebpackConfig = getWebpackConfig({
    filename:   `${ FILE_NAME }.min.js`,
    modulename: MODULE_NAME,
    minify:     true,
    vars:       {
        __MIN__: true
    }
});

export const WEBPACK_CONFIG_TEST : WebpackConfig = getWebpackConfig({
    modulename: MODULE_NAME,
    options:    {
        devtool: 'inline-source-map'
    },
    vars: {
        __TEST__: true
    }
});

export default [ WEBPACK_CONFIG, WEBPACK_CONFIG_MIN ];
