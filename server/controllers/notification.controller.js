import NotificationModel from '../models/notification.model.js';

export const getNotificationController = async (request, response) => {
  try {
    const adminId = request.userId; // Automatically fetch from auth middleware

    const notifications = await NotificationModel.find({ adminId });

    return response.json({
      message: 'Notifications fetched successfully',
      data: notifications,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
