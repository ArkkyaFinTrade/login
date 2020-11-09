const GoogleStrategy = require('passport-google-oauth20').Strategy
const FacebookStrategy = require('passport-facebook').Strategy

const { json } = require('express')
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
 //google login
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          
          userId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
          //gender : profile.gender.value,
          //mobile : profile.phonenumbers.read,
          //address :profile.addresses.formatted,
          userEmail: profile.emails[0].value,
                    
        }
        try {
          let user = await User.findOne({ userId: profile.id })

          if (user) {
            done(null, user)
          } else {
            user = await User.create(newUser)
            done(null, user)
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  passport.use(
    new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
  },

  async (accessToken, refreshToken, profile, done) => {
    const newUser = {
      
       userId: profile.id,
       displayName: profile.displayName,
       firstName: profile.name,
       lastName: profile.familyName,
       image: profile._json.picture,
       bio: profile._json.bio,
      // gender : profile.gender,
      // userEmail: email,
                
    }
    try {
      let user = await User.findOne({ userId: profile.id })

      if (user) {
        done(null, user)
      } else {
        user = await User.create(newUser)
        done(null, user)
      }
    } catch (err) {
      console.error(err)
    }
  }
 )
)



  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
}



