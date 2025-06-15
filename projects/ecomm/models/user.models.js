const mongoose = require("mongoose");

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

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;