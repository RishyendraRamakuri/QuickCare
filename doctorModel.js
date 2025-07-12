const mongoose = require("mongoose")

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    schedule: [
      {
        type: String,
        required: true,
      },
    ],
    fee: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    active: {
      type: Boolean,
      default: true,
    },
    queue: [
      {
        name: String,
        gender: String,
        reason: String,
        age: Number,
        location: String,
        paymentStatus: {
          type: String,
          enum: ["pending", "paid", "failed"],
          default: "pending",
        },
        transactionId: String,
        joinedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
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
doctorSchema.index({ hospitalId: 1, active: 1 })

module.exports = mongoose.model("Doctor", doctorSchema)
