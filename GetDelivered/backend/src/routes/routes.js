'use strict';

const product = require('../controllers/productController.js')
const profile = require('../controllers/profileController.js')

module.exports = function(app) {
    var userHandlers = require('../controllers/userController.js');
    // todoList Routes
    app.route('/tasks')
        .post(userHandlers.loginRequired, userHandlers.profile);
    app.route('/auth/register')
        .post(userHandlers.register);
   app.route('/auth/sign_in')
        .post(userHandlers.sign_in);
    app.route('/auth/sign_out')
        .post(userHandlers.sign_out);

    // product routes
    app.post('/products', product.create);

    app.post('/findbycategory',product.findByCategory);

    app.post('/find',product.findOne);

    app.post('/update',product.update);

    app.post('/delete',product.delete);

    // profile api's
    app.post('/createorder',profile.create)
    
    app.post('/getorder',profile.findByUser)
};