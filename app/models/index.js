if (!global.hasOwnProperty('db')) { 
  var mongoose = require('mongoose');
 
  // the application is executed on the local machine ...
  
  mongoose.connect('mongodb://jeruick:jeruick1991@ds031531.mongolab.com:31531/sherry');
 
 
  global.db = {
 
    mongoose: mongoose,
 
    //models
    User: require('./User')(mongoose),
    
    // agregar más modelos aquí en caso de haberlos
  };
 
}
 
module.exports = global.db;
