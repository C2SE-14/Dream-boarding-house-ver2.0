const authController = require('../controllers/auth.controller');
const router = require('express').Router();
// router.get('/',async (req, res) => {
//   return res.render('../views/components/login',{errors:''})
// });
router.post("/",authController.login);
module.exports = router;