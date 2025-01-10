#!/usr/bin/env node

import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'
import {createCourse,addLessons,getCourses, getQuestions} from '../controllers/CourseController.js';
import { userLogin, userRegister, fetchUser } from '../controllers/userController.js';
import morgan from 'morgan';
 

const app = express();
const PORT = process.env.PORT;
 
app.use(cors());
app.use(json());
app.use(morgan(':method :url :status :response-time ms - :res[content-length]'));
 
mongoose.connect("mongodb://localhost:27017/courses")

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected to MongoDB')
});



import exam  from '../routes/exams.js';
import { verifyToken } from '../middleware/verifyToken.js';
app.get('/api/exams', exam);
app.post('/user/login', userLogin);
app.get('/user/fetch', fetchUser)
app.get('/courses/:category/:title', getQuestions);
app.get('/courses/:courseCat', verifyToken("paid"), getCourses);
app.post('/admin/save/lessons', verifyToken("admin"), addLessons);
app.post('/admin/create/course', verifyToken("admin"), createCourse);
app.post('/admin/register',verifyToken("admin"), userRegister);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
