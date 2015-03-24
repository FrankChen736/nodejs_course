var fs = require('fs');
var path = require('path');

module.exports = function (session) {

  var Store = session.Store;

  function MyStore (dir) {
    this._dir = dir;
    this._data = {};
    /*
    function getSessionFileName(sid) {
      var fn = path.resolve(this._dir, '/' + sid);
      console.log(fn);
      return fn;
    } 
    */
  }

  MyStore.prototype.__proto__ = Store.prototype;

  MyStore.prototype.getSessionFileName = function (sid) {
    var fn = path.resolve(this._dir, './sessions/' + sid);
    //console.log(fn);
    return fn;
  }

  MyStore.prototype.get = function (sid, callback) {
    //check session file exist
    console.log('get: sid=%s', sid);
    console.log(MyStore);

    var sidFileName =  this.getSessionFileName(sid); 
    
    if (fs.existsSync(sidFileName)){      
       console.log('1');
       callback(null, fs.readFileSync(sidFileName));
    } else{
        console.log('2');
       callback(null, {});  
    }
    /*
    fs.exists(sidFileName, function(isExist){
      if (isExist){        
        callback(null, fs.readFileSync(sidFileName));          
        
        fs.readFile(sidFileName,function(err, data){
          if (err){
            throw err;
          } else{
            callback(null, data);    
          }
        })
        
      } else{
        callback(null, {});    
      }
    });    */
  };

  MyStore.prototype.set = function (sid, session, callback) {
    //overwrite file    
    console.log('set: sid=%s, session=%j', sid, session);
   var sidFileName = this.getSessionFileName(sid);    
   fs.writeFileSync(sidFileName, session);
   //console.log(session);
   //console.log('create session');
   callback();

   /*
    fs.writeFile(sidFileName, session, function(err){
      if (err){
        throw err;         
      }

      callback();
    });
    */
    //this._data[sid] = session;   
  };

  MyStore.prototype.destroy = function (sid, callback) {
    //delete session file 
    console.log('destroy: sid=%s', sid);

    var sidFileName = this.getSessionFileName(sid); 

    fs.unlinkSync(sidFileName);
    callback();
    /*
    if (fs.unlink(sidFileName), function(err){
      if (err){
        throw err;
      }

      callback();
    });
    */
    //delete this._data[sid];   
  };

  return MyStore;

};