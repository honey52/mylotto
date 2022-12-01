//server/models/User.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const { dblClick } = require("@testing-library/user-event/dist/click");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 150,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minlength: 5,
    },
    lastname: {
        type: String,
        maxlength: 150,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    //토큰 유효기간
    tokenExp: {
        type: Number,
    },
});

//mongoose 기능 pre > save 전에 작동
userSchema.pre("save", (next) => {
    var user = this;
    if(user.isModified("password")) {
        //비밀번호 암호화 bcrypt
        //salt 생성 (saltRounds = 10)
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err);
            //this.password = myPlaintextPassword
            bcrypt.hash(user.password, salt, (err, hash) => {
                //Store hash in your password DB
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = (plainPassword, cb) => {
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

