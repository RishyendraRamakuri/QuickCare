const mongoose = require("mongoose")

const transactionSchema = new mongoose.Schema(
  {
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["razorpay", "mock", "cash"],
      default: "razorpay",
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentGatewayResponse: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    queuePosition: {
      type: Number,
      min: 1,
    },
    patientDetails: {
      age: Number,
      gender: String,
      reason: String,
      location: String,
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

// Indexes for efficient queries
transactionSchema.index({ hospitalId: 1, paymentStatus: 1 })
transactionSchema.index({ hospitalId: 1, doctorId: 1 })
transactionSchema.index({ hospitalId: 1, createdAt: -1 })
transactionSchema.index({ transactionId: 1 })

module.exports = mongoose.model("Transaction", transactionSchema)
