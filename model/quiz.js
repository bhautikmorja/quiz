const mongoose = require('mongoose');
const schema = mongoose.Schema;
const quizschema = new schema({
    question: String,
    option: [String],
    answer: String,
    category: {
        type: schema.Types.ObjectId,
        ref: "category"
    }
});

const quiz = mongoose.model('quiz', quizschema);
module.exports = quiz;
