module.exports = function(app, passport) {

	// authenticate the login information
	app.post('/login', passport.authenticate('local-login',
  { session: false }), serialize, generateToken, respond);
  // if authenticate passes, respond with access token

  const expressJwt = require('express-jwt');
  const authenticate = expressJwt({secret : 'vidyapathaisalwaysrunning'});

  app.get('/me', authenticate, function(req, res) {
    res.status(200).json(req.user);
  });

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {
		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
}

// =====================================
// Functions ===========================
// =====================================

function serialize(req, res, next) {
  db.updateOrCreate(req.user, function(err, user){
    if(err) {return next(err);}
    // we store the updated information in req.user again
    req.user = {
      id: user.username
    };
    next();
  });
}

const db = {
  updateOrCreate: function(user, cb){
    // db dummy, we just cb the user
    cb(null, user);
  }
};

const jwt = require('jsonwebtoken');

function generateToken(req, res, next) {
  req.token = jwt.sign({
    id: req.user.id,
  }, 'vidyapathaisalwaysrunning', {
    expiresIn: 120
  });
  next();
}

function respond(req, res) {
  res.status(200).json({
    user: req.user,
    token: req.token
  });
}
