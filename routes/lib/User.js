function User(db) {
  'use strict';

  if (false === (this instanceof User)) {
    throw new Error('User constructor called without "new" operator');
  }

  this.users = db.collection('users');
}

User.prototype._validateFields = function(requestBody) {
  'use strict';
  var body = requestBody,
      objLength = Object.keys(body).length,
      index = 0,
      prop;

  for (prop in body) {
    index++;

    // HTML buttons must have name attribute and the name must contain the
    // string "btn" or this method fails.
    if (body[prop] === '' && prop.search("btn") < 0) {
      return false;
    } else if (index === objLength) {
      return true;
    }
  }
}

// Private method that does the actual account creation.
User.prototype._createAccount = function(requestBody, callback) {
  'use strict';
  var b = requestBody,
      query = {f: b.firstname, l: b.lastname, e: b.email, p: b.password};

  this.users.insert(query, function(err, result){
    callback(err, result);
  });
}

User.prototype.saveSignup = function(requestBody, callback) {
  'use strict';
  var b = requestBody;

  // Test and reject submissions with empty string.
  if (this._validateFields(b)) {
    this._createAccount(b, function(err, result) {
      if(!err){
        callback(null, 'Account created successfully.');
      } else {
        var customErr = 'An error occurred, please check your submission' +
                        ' and try again.';

        callback(customErr, null);
      }
    });
  } else {
    var invalidErr = 'Some or all your inputs are invalid, please enter' +
                      ' valid information and try again.';
    callback(invalidErr, null);
  }
}

User.prototype.loginUser = function(requestBody, callback) {
  'use strict';
  var b = requestBody,
      query = {e: b.email, p: b.password};

  // Test and reject submissions with empty string.
  if (this._validateFields(b)) {
    this.users.findOne(query, function(err, result) {
      if(result){
        callback(null, result);
      } else {
        callback('Invalid login.', null);
      }
    });
  } else {
    callback('Invalid login.', null);
  }
}

module.exports = User;
