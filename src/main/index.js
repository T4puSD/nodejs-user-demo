const express = require('express');
const passport = require('passport-jwt');
const JwtStrategy = require('passport-jwt/lib/strategy');
const dotenv = require('dotenv').config();
const userController = require('./controller/user-controller');
const { users } = require('./data/users');

const app = express()
const port = process.env.PORT || 3000

const ops = {
    jwtFromRequest : passport.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'secret',
    issuer: 'tapusd',
    audience: 'tapu'
}

app.use(new JwtStrategy(ops, (jwt_payload, done) => {
    const id = jwt_payload.sub;
    const user = users.find(user => user.id == id);
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
    }
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
}); 

app.use('/users', passport.authenticate('jwt', {session: false}), userController);


app.listen(port, ()=> {
    console.log("Listening on port: "+ port);
})