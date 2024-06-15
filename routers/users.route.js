const express = require("express");
const {
    getAllUsers, getUserProfile, updateUserProfile,
    changePassword, resetPassword, addRole, removeRole,
    activateUser, deactivateUser
  } = require("../controllers/user.controller");
const {authMiddleware, adminMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

router.get("/",authMiddleware, adminMiddleware,getAllUsers);

// User profile routes
router.get('/profile', authMiddleware, getUserProfile);
router.put('/profile', authMiddleware, updateUserProfile);

// Password management routes
router.post('/change-password', authMiddleware, changePassword);
router.post('/reset-password', resetPassword);

// Role management routes
router.post('/add-role', authMiddleware, adminMiddleware, addRole);
router.post('/remove-role', authMiddleware, adminMiddleware, removeRole);

// Account management routes
router.post('/activate', authMiddleware, adminMiddleware, activateUser);
router.post('/deactivate', authMiddleware, adminMiddleware, deactivateUser);


module.exports = router;
