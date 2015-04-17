var fs = require('fs');
var path = require('path');

module.exports = function (session) {

  var Store = session.Store;

  function MyStore (dir) {
    this._dir = dir;
    this._data = {};    
  }

  MyStore.prototype.__proto__ = Store.prototype;

  MyStore.prototype.getSessionFileName = function (sid) {
    var fn = path.resolve(this._dir, './' + sid);
    //console.log(fn);
    return fn;
  }

  MyStore.prototype.get = function (sid, callback) {
    
    console.log('get: sid=%s', sid);
    
    var sidFileName =  this.getSessionFileName(sid); 
    //Async
    //check session file exist
    fs.exists(sidFileName, function(exists){
      if(exists){
        fs.readFile(sidFileName, function(err, data){
        if (err){
          throw err;
        } 

        callback(null, JSON.parse(data));       
    });
      } else {
        callback(null, null);  
      }
    });    

    /*
    if (fs.existsSync(sidFileName)){      
       callback(null, JSON.parse(fs.readFileSync(sidFileName)));
    } else{
       callback(null, null);  
    } 
    */   
  };

  MyStore.prototype.set = function (sid, session, callback) {
    //overwrite file    
    console.log('set: sid=%s, session=%j', sid, session);
   var sidFileName = this.getSessionFileName(sid);  
   //Async
   fs.writeFile(sidFileName, JSON.stringify(session), function(err){
    if(err){
      throw err;
    }

    callback();
   } );
   /*  
   fs.writeFileSync(sidFileName, JSON.stringify(session));
   callback();
   */
  };

  MyStore.prototype.destroy = function (sid, callback) {
    //delete session file 
    console.log('destroy: sid=%s', sid);

    var sidFileName = this.getSessionFileName(sid); 
    fs.exists(sidFileName, function(exists){
      if(exists){
        fs.unlink(sidFileName, function(err){
          if (err){
            throw err;
          }

          if (callback == 'function'){
            callback();  
          }
        });
      } else {
        if (callback == 'function'){
          callback();
        }  
      }
    });
    /*
    if (fs.existsSync(sidFileName)){      
      fs.unlinkSync(sidFileName);
    }    
    */
  };

  return MyStore;

};