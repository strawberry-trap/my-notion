const { google } = require('googleapis');
const router = require('express').Router();

const oauth2Client = new google.auth.OAuth2(
    '700723661373-kv9g5sqbijjgnt6qjaa7k90nfiau8b7k.apps.googleusercontent.com',
    'HnQJYLhn0Rom5dSo26deHE8l',
    'http://localhost:3002/auth/google/callback'
);

const redirectUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['email', 'profile']
});

let auth = false; // for what ?

router.get('/', async function (req, res) {
    let oauth2 = google.oauth2({version: 'v1', auth: oauth2Client});
    if (auth) {
        console.log('auth true');
        let userInfo = await oauth2.userinfo.v2.me.get();
        res.render('index', {buttonSpan: 'Sign out', url: 'http://localhost:3002/logout', userInfo: userInfo.data})
    } else {
        console.log('auth false');
        res.render('index', {buttonSpan: 'Sign in', url: redirectUrl, userInfo: {}})
    }
});

router.get('/auth/google/callback', async function (req, res) {
    const code = req.query.code;
    if (code) {
        const {tokens} = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        auth = true;
    }
    res.redirect('/');
});

router.get('/logout', (req, res) => {
    oauth2Client.revokeCredentials().then(r => console.log('revoke ', r));
    auth = false;
    res.redirect('/');
});

module.exports = router;
