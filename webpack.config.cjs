const FileManagerPlugin = require("filemanager-webpack-plugin");

const path = require("path");

module.exports = {
	experiments: {
		outputModule: true
	},
	mode: "production",
	entry: {
		fulltilt: "./src/Core.ts",
		"fulltilt.min": "./src/Core.ts",
	},
	devtool: "source-map",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: '[name].js',
		clean: false,
		globalObject: "this",
		library: {
			type: "module",
			export: "default",
		},
		umdNamedDefine: true,
	},
	devServer: {
		static: ["."],
		https: true,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	plugins: [
		new FileManagerPlugin({
			events: {
				onEnd: {
					copy: [
						{
							source: path.resolve(__dirname, "dist", "fulltilt.min.js"),
							destination: path.resolve(
								__dirname,
								"docs/examples",
								"fulltilt.min.js"
							),
						},
					],
				},
			},
		}),
	],
};
