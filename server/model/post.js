import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    company: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date
    },
});

const post = mongoose.model('post', postSchema);

export default post;