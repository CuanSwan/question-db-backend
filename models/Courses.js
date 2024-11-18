import { Schema, model } from 'mongoose';

const courseData = new Schema({
 title: String,
 lessons: Array,
 category: String,
 description: String,
 learningObs: Array,
});

const Course = model('Course', courseData);
export default Course