var multer = require('multer');
var upload = multer({
    dest: './uploads/'
});
var cloudinary = require('cloudinary');

var configForCloudinary;

if( process.env.CLOUDINARY_URL ){

  configForCloudinary = process.env.CLOUDINARY_URL;

}else{
  configForCloudinary = require("./config.json");
}

cloudinary.config(configForCloudinary);



module.exports = (app, allModels) => {


  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR POKEMON CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  const mainControllerCallbacks = require('./controllers/main')(allModels);
  const userControllerCallbacks = require('./controllers/user')(allModels);
  const groupControllerCallbacks = require('./controllers/group')(allModels);
  const billControllerCallbacks = require('./controllers/bill')(allModels)

  app.get('/', mainControllerCallbacks.redirect);
  app.get('/BillSplitter', mainControllerCallbacks.index);
  app.get('/BillSplitter/login', userControllerCallbacks.login);
  app.post('/BillSplitter/login', userControllerCallbacks.loginPost);
  app.get('/BillSplitter/register', userControllerCallbacks.register);

  app.post('/BillSplitter/register', userControllerCallbacks.registerPost);
  app.get('/BillSplitter/logout', userControllerCallbacks.logout);
  app.get('/BillSplitter/create_group', groupControllerCallbacks.createGroup);
  app.post('/BillSplitter/create_group',groupControllerCallbacks.createGroupPost);
  app.get('/BillSplitter/groupList',groupControllerCallbacks.listAll);
  app.get('/BillSplitter/friendList',userControllerCallbacks.listFriends);
  app.get('/BillSplitter/friendList/:friend_id',userControllerCallbacks.getFriendBills);
  app.post('/BillSplitter/friendList/:friend_id/settleByUser',userControllerCallbacks.settleByUser);
  app.get('/BillSplitter/groupList/:id',groupControllerCallbacks.singleGroup);
  app.get('/BillSplitter/groupList/:id/chooseWhoToSettleInGroup',groupControllerCallbacks.chooseSettleByGroup)
  app.get('/BillSplitter/groupList/:id/newBill',billControllerCallbacks.newBill)
  app.get('/BillSplitter/groupList/:id/group_profile',groupControllerCallbacks.groupProfile)
  app.post('/BillSplitter/groupList/:id/groupProfilePost',upload.single('myFile'),groupControllerCallbacks.groupProfilePost)
  app.post('/BillSplitter/groupList/:id/addInBill',billControllerCallbacks.newBillPost);
  app.post('/BillSplitter/groupList/:group_id/chooseWhoToSettleInGroup/:settler_id',billControllerCallbacks.settleGroupBill);
  app.get('/BillSplitter/groupList/:id/:billId',billControllerCallbacks.singleBill);

  app.get('/BillSplitter/groupList/:id/:billId/editBill',billControllerCallbacks.editBill);
  app.post('/BillSplitter/groupList/:id/:billId/editBill',billControllerCallbacks.editBillPost);
  app.post('/BillSplitter/groupList/:id/:billId/deleteBill',billControllerCallbacks.deleteBill);
  app.get('/BillSplitter/user_profile',userControllerCallbacks.userProfile);
  app.get('/BillSplitter/user_profile/edit_profile',userControllerCallbacks.editProfile);
  app.post('/BillSplitter/user_profile/edit_profile',userControllerCallbacks.editProfilePost);
  app.get('/BillSplitter/user_profile/change_password',userControllerCallbacks.changePassword);
  app.post('/BillSplitter/user_profile/change_password',userControllerCallbacks.changePasswordPost);
  app.post('/BillSplitter/user_profile/postProfilePic',upload.single('myFile'),userControllerCallbacks.postProfilePic);
  app.get('/BillSplitter/activityList',mainControllerCallbacks.getAllActivities);
};

