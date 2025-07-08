// src/models/Article.js
import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  meta: { // Optional: You might want to store more meta info from Gemini
    title: String,
    description: String,
  },
  content: {
    type: String,
    required: true,
  },
  media: [{ // New field for media
    url: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: 'Article image',
    },
    type: { // e.g., 'image', 'video'
      type: String,
      default: 'image',
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Article = mongoose.models.Article || mongoose.model('Article', ArticleSchema);

export default Article;