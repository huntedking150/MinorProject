// import mongoose from 'mongoose';

// const notificationSchema = new mongoose.Schema(
//   {
//     adminId: {
//       type: mongoose.Schema.ObjectId,
//       ref: 'User', // Reference to Admin User
//       required: true,
//     },
//     orderId: {
//       type: mongoose.Schema.ObjectId,
//       ref: 'order',
//       required: true,
//     },
//     message: {
//       type: String,
//       required: true,
//     },
//     status: {
//       type: String,
//       enum: ['Pending', 'Accepted', 'Rejected'],
//       default: 'Pending',
//     },
//     isRead: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   { timestamps: true }
// );

// const NotificationModel = mongoose.model('Notification', notificationSchema);
// export default NotificationModel;

import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected'],
      default: 'Pending',
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model('Notification', notificationSchema);
export default NotificationModel;
