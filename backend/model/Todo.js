const { text } = require('express');
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    text: {type: String, required: true}
})

const todoModel = mongoose.model("todos", todoSchema);

module.exports = todoModel;