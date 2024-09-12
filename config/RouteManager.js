// RouteManager.js
const productRoute = require('../routes/product');
const productTypeRoute = require('../routes/product_type');
const statusRoute = require('../routes/status');
const userRoute = require('../routes/user');
const statisticsRoute = require('../routes/statistics');

class RouteManager {
    constructor(app) {
        this.app = app;
    }

    initializeRoutes() {
        this.app.use(productRoute);
        this.app.use(productTypeRoute);
        this.app.use(statusRoute);
        this.app.use(userRoute);
        this.app.use(statisticsRoute);
    }
}

module.exports = RouteManager;
