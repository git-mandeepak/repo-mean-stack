const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/userController');

const jwtHelper = require('../config/jwtHelper');

router.get('/user/getusers', jwtHelper.verifyJwtToken, ctrlUser.getusers);
router.get('/user/getuserbyid/:id', ctrlUser.getuserbyid);
router.post('/user/register', ctrlUser.register);
router.put('/user/updateuser/:id', ctrlUser.updateuser);
router.delete('/user/deleteuser/:id', ctrlUser.deleteuser);
router.post('/user/authenticate', ctrlUser.authenticate);
router.get('/user/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);

module.exports = router;