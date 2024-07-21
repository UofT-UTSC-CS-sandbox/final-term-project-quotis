import mongoose, { Document, Model, Schema } from 'mongoose';

interface INotification extends Document {
  userId: string;
  notification: string;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema({
  userId: {
    type: String,
    required: true,
    ref: 'User',
  },
  notification: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    updatedAt: true,
  },
});

const Notification: Model<INotification> = mongoose.model<INotification>('Notification', notificationSchema);

export default Notification;