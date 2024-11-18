import express, { json } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'
import getquestion from './controllers/getquestion.js';
import {createCourse,addLessons,getCourses} from './controllers/CourseController.js';
import { userLogin, userRegister } from './controllers/userController.js';

const app = express();
const PORT = process.env.PORT;
 
app.use(cors());
app.use(json());
 
mongoose.connect("mongodb://localhost:27017/courses", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Connected to MongoDB')
});



import exam  from './routes/exams.js';
app.get('/api/exams', exam);
app.use('/user/login', userLogin);
app.use('/user/register', userRegister);
app.get('/python/:course/:quesnum', getquestion);
app.get('/courses/:courseCat', getCourses)
app.post('/admin/save/lessons', addLessons)
app.post('/admin/create/course', createCourse)

 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});