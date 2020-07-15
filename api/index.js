const express = require('express');
const bodyParser = require('body-parser');
const { FusionAuthClient } = require('@fusionauth/typescript-client');
const multer = require('multer')().single();

const app = express();

const client = new FusionAuthClient(process.env.PASSPORT_API_KEY, 'http://passport.voxtl.tv:9011');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer);

app.get('/', (req, res) => {
    res.send('No');
});

app.post('/auth/login', (req, res) => {
    const obj = {
        'loginId': req.body.username,
        'password': req.body.password,
        'applicationId': 'ea900ff1-7c08-4f24-afdb-2a3298ae6e99'
    };

    client.login(obj)
        .then(function(clientResponse) {
            let obj = {
                'token': clientResponse.response.token
            };

            res.json(obj);
        }).catch(function(error) {
        res.send(error);
    });
});

app.get('/auth/user', (req, res) => {
    const auth = req.get('authorization');

    if(auth == null) {
        return res.send('no');
    }

    const parts = auth.split(' ');
    if(parts.length < 2) {
        return res.send('nope');
    }

    if(parts[0].toLowerCase() !== 'bearer') {
        return res.send('not this time');
    }

    const bearer = parts[1];

    client.retrieveUserUsingJWT(bearer).then(r => {
        const obj = {
            'user': {
                'id': r.response.user.id,
                'username': r.response.user.username
            }
        };

        res.json(obj);
    }).catch(err => {
        console.error(err);
    });
});

module.exports = {
    path: "/api/",
    handler: app
}





