const { renderProfile, renderJoin, renderMain } = require('../controllers/page');
const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  // 임시 데이터
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followingIdList = [];
  next();
});

/**
 * 컨트롤러: 라우터의 마지막 미들웨어
 */
router.get('/profile', renderProfile);
router.get('/join', renderJoin);
router.get('/', renderMain);

module.exports = router;
