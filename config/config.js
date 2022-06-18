const morgan = require('morgan');
const cookieParser = require('cookie-parser');
module.exports = function(app){
    app.use(cookieParser);
    app.use(morgan);

    console.log('config system is working');

    return app;
}