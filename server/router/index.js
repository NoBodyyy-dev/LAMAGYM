const router = require('express').Router();

// static resource routes
const authRoutes = require('./userRouter');
const postRoutes = require('./postRouter');
const subRoutes = require('./subRouter');
const messageRoutes = require('./messageRouter');
const commentRoutes = require('./commentRouter');

router.use('/user', authRoutes);
router.use('/post', postRoutes);
router.use('/sub', subRoutes)
router.use('/message', messageRoutes);
router.use('/comment', commentRoutes)

module.exports = router;