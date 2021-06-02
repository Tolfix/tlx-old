const mongoose = require("mongoose");

const RedirectSchema = new mongoose.Schema({
    
    id: {
        type: String,
        required: true
    },

    redirect: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

});

const Redirect = mongoose.model("redirect", RedirectSchema);

module.exports = Redirect;