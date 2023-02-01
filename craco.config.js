const path = require("path");

module.exports = {
	webpack: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@layout": path.resolve(__dirname, "./src/components/layout"),
			"@pages": path.resolve(__dirname, "./src/components/pages"),
			"@shared": path.resolve(__dirname, "./src/components/shared"),
			"@styles": path.resolve(__dirname, "./src/styles"),
			"@images": path.resolve(__dirname, "./src/assets/images"),
			"@services": path.resolve(__dirname, "./src/services"),
			"@constants": path.resolve(__dirname, "./src/services/constants"),
			"@utils": path.resolve(__dirname, "./src/services/utils"),
			"@store": path.resolve(__dirname, "./src/store"),
		},
	},
};
