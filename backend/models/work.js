const mongoose = require("mongoose")

const avaliationSchema = new mongoose.Schema({
  grade: { type: Number, required: true },
  comment: String
})

const fileSchema = new mongoose.Schema({
  original: { type: String, required: true },
  filename: { type: String, required: true },
  extension: { type: String, lowercase: true },
  size: Number
})

const workSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: { type: [String], index: true },
  files: [fileSchema],
  avaliations: [avaliationSchema],
  downloads: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Work", workSchema)
