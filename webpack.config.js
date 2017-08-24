const path = require('path'),
      postCSS = require('./postcss.config.js'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

//set node env to start
const nodeEnv = process.env.NODE_ENV || 'development';

//check whether production; set to prod if true
const isProd = nodeEnv === 'production';

//enter project folder name
const PROJECT_NAME = 'ProjectName';

//configure paths
const configPaths = {
    base: path.resolve(__dirname, `./${PROJECT_NAME}`),
    src: path.resolve(__dirname, `./${PROJECT_NAME}/src`),
    build: path.resolve(__dirname, `./${PROJECT_NAME}/build`),
    assets: path.resolve(__dirname, `./${PROJECT_NAME}/src/assets/`),
    js: path.resolve(__dirname, `./${PROJECT_NAME}/src/js/scripts.js`),
    sass: path.resolve(__dirname, `./${PROJECT_NAME}/src/sass/style.scss`)
};

//COMMON PROCESSES TO ALL ENVIRONMENTS

//rules/loaders
const rules = [
    { //babel for js
        test: /\.js$/, //files ending with .js
        exclude: /(node_modules)/,
        loader: ['babel-loader'] //use this loader
    },
    // { // regular css files
    //     test: /\.css$/,
    //     loader: ExtractTextPlugin.extract({
    //     loader: 'css-loader?importLoaders=1',
    //     }),
    // }
];

//plugins
const plugins = [
    new ExtractTextPlugin({ // define where to save the compiled css file
        filename:'style.css',
        allChunks: true,
    }),
];


//PRODUCTION ONLY

if (isProd) {

    //rules
    rules.push(
        {
            test: /\.(sass|scss)$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
            })
        }
    );

    //plugins
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
            ie8: false,
        })
    );

//DEVELOPMENT ONLY
} else {

    //rules/loaders
    rules.push(
        { // sass / scss loader
            test: /\.(sass|scss)$/,
            loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']) //sass-loader only for dev b/c it's faster
        }
    );

    plugins.push(
      function() {
        this.plugin('watch-run', function(watching, callback) {
              console.log('Begin compile at ' + new Date());
              callback();
          })
        }
    );
}

let globalConfig = {
    entry: ['core-js/fn/promise', configPaths.js, configPaths.sass],
	  resolve: {
		  extensions: ['.js', '.json', '.scss']
	  },
    output: {
        filename:'scripts.js',
        path: configPaths.build
    },
    module: {
        rules
    },
    plugins
};

module.exports = globalConfig;
