var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var User = require('./models/userRegster');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
    function (username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { username: true });
            }
            if (!user.isValid(password)) {
                return done(null, false, { password: true });
            }
            // if(!user.status){
            //     return done(null, false, {email: true})
            // }

            return done(null, user);
        });
    }
));


passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});