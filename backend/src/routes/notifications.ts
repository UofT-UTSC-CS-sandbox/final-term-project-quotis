import express, { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import Provider from "../models/Provider";

const router = express.Router();

// Retrieve notifications
router.get("/:userType/:userId/notifications", async (req: Request, res: Response) => {
  const { userType, userId } = req.params;
  console.log(`Fetching notifications for userType: ${userType}, userId: ${userId}`);

  try {
    let user;
    if (userType === 'client') {
      user = await User.findById(userId);
    } else if (userType === 'provider') {
      user = await Provider.findById(userId);
    }

    if (!user) {
      console.log(`User not found for userType: ${userType}, userId: ${userId}`);
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.notifications);
  } catch (err: any) {
    console.log(`Error fetching notifications: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

// Add notification route
router.post("/:userType/:userId/notify", async (req: Request, res: Response) => {
  const { action, entityId, message } = req.body;
  const { userType, userId } = req.params;
  console.log(`Adding notification for userType: ${userType}, userId: ${userId}, action: ${action}`);

  try {
    let user;
    if (userType === 'client') {
      user = await User.findById(userId);
    } else if (userType === 'provider') {
      user = await Provider.findById(userId);
    }

    if (user) {
      user.notifications.push({
        type: action,
        entity_id: entityId,
        date_created: new Date(),
        message: message,
      });
      await user.save();
    }

    res.status(200).json({ message: "Notification added" });
  } catch (err: any) {
    console.log(`Error adding notification: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

// Delete notification route
router.delete("/:userType/:userId/notifications/:notificationId", async (req: Request, res: Response) => {
  const { userType, userId, notificationId } = req.params;
  console.log(`Deleting notification for userType: ${userType}, userId: ${userId}, notificationId: ${notificationId}`);

  try {
    let user;
    if (userType === 'client') {
      user = await User.findById(userId);
    } else if (userType === 'provider') {
      user = await Provider.findById(userId);
    }

    if (!user) {
      console.log(`User not found for userType: ${userType}, userId: ${userId}`);
      return res.status(404).json({ message: "User not found" });
    }

    const notificationExists = user.notifications.some(
      (notification: any) => notification._id.toString() === notificationId
    );

    if (!notificationExists) {
      console.log(`Notification not found for notificationId: ${notificationId}`);
      return res.status(404).json({ message: "Notification not found" });
    }

    user.notifications = user.notifications.filter(
      (notification: any) => notification._id.toString() !== notificationId
    );

    await user.save();
    res.status(200).json({ message: "Notification deleted" });
  } catch (err: any) {
    console.log(`Error deleting notification: ${err.message}`);
    res.status(500).json({ message: err.message });
  }
});

export default router;
