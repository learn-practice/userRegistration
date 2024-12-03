const express = require('express');
const router = express.Router();
const {registration,deleteUser,updateUser, getUser} = require('../controller/userController.js')
router.get('/',getUser);

router.post('/register',registration);
router.delete('/delete/:id',deleteUser);
router.put('/updateUser/:id',updateUser);


module.exports = router;