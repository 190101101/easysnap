import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SnapSchema = new Schema(
  {
    snap: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Snap', SnapSchema);
