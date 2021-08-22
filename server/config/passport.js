module.exports = passport => {
  const LocalStrategy = require('passport-local').Strategy;
  const { db } = require('../routes/query-db');
  passport.serializeUser((user, done) => {
    console.log({ serializeUser: user });
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log({ deserializeUser: id });
    const SelectQuery = 'SELECT * FROM users WHERE id=?';
    db.query(SelectQuery, [id], (err, result) => {
      console.log({ err, result });
      if (result.length) {
        return done(null, result[0]);
      } else {
        return done(null, false, {
          message: ' Invalid user'
        });
      }
    });
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // pass back req to the callback
      },
      async (req, email, password, done) => {
        try {
          console.log({ email, password });
          const SelectQuery =
            'SELECT * FROM users WHERE email=? AND password=?';
          db.query(SelectQuery, [email, password], (err, result) => {
            console.log({ err, result });
            if (result && result.length) {
              return done(null, result[0]);
            } else {
              return done(null, false, {
                message: ' Invalid credentials'
              });
            }
          });
        } catch (error) {
          return done(null, false, {
            message: error
          });
        }
      }
    )
  );
};
