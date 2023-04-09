const FileManagerPlugin = require("filemanager-webpack-plugin");

const path = require("path");

module.exports = {
	mode: "development",
	entry: "./src/Core.ts",
	devtool: "inline-source-map",
	output: {
		filename: "fulltilt.min.js",
		path: path.resolve(__dirname, "dist"),
		clean: true,
		globalObject: "this",
		library: {
			name: "FULLTILT",
			type: "umd",
			export: "default",
		},
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
							destination: path.resolve(__dirname, "docs/examples", "fulltilt.min.js"),
						},
					],
				},
			},
		}),
	],
};
