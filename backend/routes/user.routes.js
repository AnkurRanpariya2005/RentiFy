import express from 'express'
import { updateUser, DeleteUser, signOut } from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/verifyUser.middleware.js';
// import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

// router.put('/update/:userId', verifyToken, upload.single('file'), updateUser)

router.put('/update/:userId', verifyToken, updateUser)
router.delete('/delete/:userId', verifyToken, DeleteUser)
router.post('/signout', signOut)

export default router;