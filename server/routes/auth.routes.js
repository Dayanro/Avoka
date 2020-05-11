const express = require("express")
const router = express.Router()
const passport = require("passport")
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router.post('/session', ensureLoggedOut(), (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if (err) {
            res.status(500).json({ message: 'Something went wrong authenticating user' });
            return;
        }

        if (!theUser) {
            res.status(401).json(failureDetails);
            return;
        }

        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Session save went bad.' });
                return;
            }

            res.status(200).json(theUser);
        });
    })(req, res, next);
});

router.delete('/session', ensureLoggedIn(), (req, res, next) => {
    req.logout();
    res.status(200).json({ message: 'Log out success!' });
});

module.exports = router