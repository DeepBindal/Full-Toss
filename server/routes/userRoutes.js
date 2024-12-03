import express from 'express'
import { asyncHandler } from '../utils/asyncHandler.js';
import { fetchUser, loginUser, logoutUser, refreshAccessToken, registerUser, testUser, updateUserTeam } from '../controllers/userController.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route("/register").post(asyncHandler(registerUser));

router.route("/login-user").post(asyncHandler(loginUser))

router.route('/logout').get(verifyJWT, asyncHandler(logoutUser))

router.route("/refresh-token").post(refreshAccessToken);

router.route("/fetch").get(verifyJWT, asyncHandler(fetchUser))
router.route("/update-team").post(verifyJWT, asyncHandler(updateUserTeam))
export default router;