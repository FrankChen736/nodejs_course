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
    //check session file exist
    console.log('get: sid=%s', sid);
    
    var sidFileName =  this.getSessionFileName(sid); 
    
    if (fs.existsSync(sidFileName)){      
       callback(null, JSON.parse(fs.readFileSync(sidFileName)));
    } else{
       callback(null, null);  
    }    
  };

  MyStore.prototype.set = function (sid, session, callback) {
    //overwrite file    
    console.log('set: sid=%s, session=%j', sid, session);
   var sidFileName = this.getSessionFileName(sid);    
   fs.writeFileSync(sidFileName, JSON.stringify(session));
   callback();
  };

  MyStore.prototype.destroy = function (sid, callback) {
    //delete session file 
    console.log('destroy: sid=%s', sid);

    var sidFileName = this.getSessionFileName(sid); 
    if (fs.existsSync(sidFileName)){      
      fs.unlinkSync(sidFileName);
    }
    
    if (callback == 'function'){
      callback();
    }  
  };

  return MyStore;

};