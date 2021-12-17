const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var custom = new Schema({
name: { type: String, required: true },
items: {
    type: [
    {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: String, required: true },
        },
    ],
    required: true,
    },
});

module.exports = mongoose.model("Custom", custom);