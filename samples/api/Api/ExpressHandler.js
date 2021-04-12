class Express {}

Express.Express = require('express');
Express.App = Express.Express();
Express.BodyParser = require('body-parser');
Express.Cors = require('cors');
Express.fs = require('fs');
Express.http = require('http');
Express.server;

Express.init = function(port, publicPresenter, Presenter) {
    Express.port = port;
    Express.PublicPresenter = publicPresenter;
    return new Promise(async (resolve) => {
        try {
            Express.App.use(Express.BodyParser.json({limit: '50mb', extended: true}))
            Express.App.use(Express.BodyParser.urlencoded({ limit: '50mb', extended: true }));

            Express.App.use(function(req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', '*');
                res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers,Authorization,Sec-Fetch-Mode');
                res.setHeader('Access-Control-Allow-Credentials', true);
                next();
            });
            Express.App.all('/api/*', Express.Cors(), function (req, res) {
                if (Presenter.handleApi) Presenter.handleApi(req, res);
            });
            
            Express.server = Express.http.createServer({}, Express.App);

            Express.server.listen(Express.port, function () {
                console.log('Api is up and running at port: ' + Express.port)
                resolve(true);
            });
        } catch (e) {
            console.log(e);
        }
    });
}

module.exports = Express;