// import { Router } from 'express';
// import auth from '../middleware/auth.js';
// import {
//   getNotificationsController,
//   updateNotificationStatusController,
// } from '../controllers/notification.controller.js';

// const notificationRouter = Router();

// notificationRouter.get('/get', auth, getNotificationsController);
// notificationRouter.put(
//   '/update-status',
//   auth,
//   updateNotificationStatusController
// );

// export default notificationRouter;

import { Router } from 'express';
import auth from '../middleware/auth.js';
import {
  getNotificationController,
  // updateNotificationStatusController,
} from '../controllers/notification.controller.js';

const notificationRouter = Router();

notificationRouter.get('/admin', auth, getNotificationController);
// notificationRouter.put('/update', auth, updateNotificationStatusController);

export default notificationRouter;
