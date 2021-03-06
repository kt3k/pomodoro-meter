
var mongo = require('./mongo');

var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var uuid = require('uuid');


passport.use(new FacebookStrategy({

    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_APP_SECRET,
    callbackURL: 'http://' + process.env.SERVICE_HOSTNAME + '/auth/facebook/callback',
    enableProof: false

}, function (accessToken, refreshToken, profile, done) {

    mongo.Account.findOneAndUpdate({

        facebookId: profile.id

    }, {

        displayName: profile.displayName,
        givenName: profile.name.givenName,
        familyName: profile.name.familyName,
        givenName: profile.name.givenName

    }, {

        upsert: true

    }).exec().then(function (account) {

        if (!account.id) {

            account.id = uuid.v4();

        }

        if (!account.createdAt) {

            account.createdAt = new Date().getTime();

        }

        return account.psave().then(function () {

            done(null, account);

        });

    }, function (err) {

        done(err);

    }).then(null, function (err) {

        console.log(err);
        console.log(err.stack);

    });

}));

module.exports = passport;
