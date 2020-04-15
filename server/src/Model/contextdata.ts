import mongoose from "mongoose";
let ContextData = new mongoose.Schema({
  deviceId: {
    type: mongoose.Types.ObjectId,
    ref: "device",
  },
  timeString: { type: String },
  location: {
    type: {
      latitude: Number,
      longitude: Number,
      provider: String,
      time: Number,
      accuracy: Number,
      altitude: Number,
    },
  },
  accelerometerData: {
    type: {
      x: Number,
      y: Number,
      z: Number,
    },
  },
  barometerData: { type: { pressure: Number, relativeAltitude: Number } },
  gyroscopeData: {
    type: {
      x: Number,
      y: Number,
      z: Number,
    },
  },
  magnetometerData: {
    type: {
      x: Number,
      y: Number,
      z: Number,
    },
  },
});
export default mongoose.model("contextdata", ContextData);
