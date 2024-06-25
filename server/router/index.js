const router = require('express').Router();

// static resource routes
const authRoutes = require('./userRouter');
const postRoutes = require('./postRouter');
// const commentRoutes = require('./commentRouter');
// const userRoutes = require('./userRouter');

// dynamic resource routes
// no-dynamic-routes

router.use('/user', authRoutes);
router.use('/posts', postRoutes);
// router.use(['/comment', '/comments'], commentRoutes);
// router.use(['/user', '/users'], userRoutes);

module.exports = router;