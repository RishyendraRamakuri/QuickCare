const mongoose = require("mongoose")

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
      max: 150,
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    reason: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    visitedAt: {
      type: Date,
      default: Date.now,
    },
    hospitalId: {
      type: String,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
)

// Index for efficient queries
patientSchema.index({ hospitalId: 1, doctorId: 1 })
patientSchema.index({ hospitalId: 1, visitedAt: -1 })

module.exports = mongoose.model("Patient", patientSchema)
