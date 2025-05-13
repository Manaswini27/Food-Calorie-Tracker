import express from 'express';
import CalorieEntry from '../models/CalorieEntry.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Add new calorie entry
router.post('/', auth, async (req, res) => {
  try {
    const { type, calories } = req.body;
    const entry = new CalorieEntry({
      user: req.user.userId,
      type,
      calories,
    });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Error adding entry' });
  }
});

// Get entries by time period
router.get('/:period', auth, async (req, res) => {
  try {
    const { period } = req.params;
    let startDate = new Date();
    
    switch (period) {
      case 'daily':
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'weekly':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'monthly':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      default:
        return res.status(400).json({ message: 'Invalid period' });
    }

    const entries = await CalorieEntry.find({
      user: req.user.userId,
      date: { $gte: startDate }
    }).sort({ date: 1 });

    const summary = entries.reduce((acc, entry) => {
      const date = entry.date.toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { intake: 0, burned: 0 };
      }
      acc[date][entry.type] += entry.calories;
      return acc;
    }, {});

    res.json(Object.entries(summary).map(([date, data]) => ({
      date,
      ...data
    })));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching entries' });
  }
});

export default router;