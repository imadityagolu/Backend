const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobNo: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        addressLine1: {
            type: String,
            required: true
        },
        addressLine2: {
            type: String,
            required: false,
            default: ""
        },
        landMark: {
            type: String,
            required: false,
            default: ""
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        pincode: {
            type: String,
            required: true
        }
    }
});


// save - internal middleware of mongoose automatically executes before saving any data 
userSchema.pre("save", async function () {

    //hasing to protect password
    //salt(degree of complexicity from 1-10, 10 is highest)
    const salt = await bcrypt.genSalt(10);

    //salt + hash
    const hashPassword = await bcrypt.hash(this.password,salt);

    //assigning hash password
    this.password = hashPassword;
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;