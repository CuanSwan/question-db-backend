import Course from "../models/Courses.js";

export const createCourse = async (req, res) => {
        const { title, lessons, category, description, learningObs } = req.body;
        
        try {
          const exists = await Course.exists({title})
          if (exists){ 
            res.status(424).json({error: 'A course with that title already exists'})
            return
          }
          const course = new Course({ title, lessons, category, description, learningObs });
          const savedCourse = await course.save();
          res.status(201).json(savedCourse);
        } catch (error) {
          res.status(500).json({ error: 'An error occurred while creating the course' });
        }
}

export const addLessons = async (req, res) => {
    const {title, lessons} = req.body;
    await Course.updateOne({title}, {lessons});
    res.status(201).json("Course created");
}

export const getCourses = async (req, res) => {
  await Course.find({category: { $regex: new RegExp('^' + req.params.courseCat + '$', 'i') }}).then((c) => {
    console.log('Course found')
    res.status(201).json(c)
  }).catch(
    err => {
      console.error(err)
    }
  )
  
}