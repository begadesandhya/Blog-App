const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    blogLanguage: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId, ref: 'blogCategory'

    },
    title: {
        type: String,
        required: true,
    },
     titleImage: {
        type: String,
        // required: true,
    }, 
    description: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    // url: {
    //     type: String,
    //     
    // },
    slug: {
        type: String,
        required: true,
    },
    timeDurationToRead: {
        type: String,
        required: true,
    },
    isFeatured: {
        type: Boolean,
        required: true,
        default: false
    },
    blogStatus: {
        type: Number,
        required: true,
        default: 0 // 0 - Inactive, 1 - active, 2 - deleted
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    updatedAt: {
        type: Date, 
        default: Date.now
    }
});

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;