module.exports = function(app, passport) {

// =========== authenticate login info and generate access token ===============

  app.post('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
      if (err) { return next(err); }
      // stop if it fails
      if (!user) { return res.json({ message: 'Invalid Username of Password' }); }

      req.logIn(user, function(err) {
        // return if does not match
        if (err) { return next(err); }

        // generate token if it succeeds
        const db = {
          updateOrCreate: function(user, cb){
            cb(null, user);
          }
        };
        db.updateOrCreate(req.user, function(err, user){
          if(err) {return next(err);}
          // store the updated information in req.user again
          req.user = {
            id: user.username
          };
        });

        // create token
        const jwt = require('jsonwebtoken');
        req.token = jwt.sign({
          id: req.user.id,
        }, 'vidyapathaisalwaysrunning', {
          expiresIn: 120
        });

        // lastly respond with json
        return res.status(200).json({
          user: req.user,
          token: req.token
        });
      });
    })(req, res, next);
  });

// =============================================================================

// ==================== Allows users to create accounts ========================

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/signup/successjson',
    failureRedirect : '/signup/failurejson',
    failureFlash : true
    }));
  // return messages for signup users
  app.get('/signup/successjson', function(req, res) {
    res.json({ message: 'Successfully created user' });
  });

  app.get('/signup/failurejson', function(req, res) {
    res.json({ message: 'This user already exists' });
  });

// =============================================================================

// if authenticate passes, respond with access token

  const expressJwt = require('express-jwt');
  const authenticate = expressJwt({secret : 'vidyapathaisalwaysrunning'});

  app.get('/me', authenticate, function(req, res) {
    res.status(200).json(req.user);
  });

}
