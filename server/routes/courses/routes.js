import jwt from 'jsonwebtoken';
import { validateCourse, validateUser } from '../../util/inputValidation';


// insert a course to course list
const addCourse = (req, res) => {
  const { error } = validateCourse(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(courses);
}

// update a course
const updateCourse = (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('item doesn\'t exist');
  const { error } = validateCourse(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  course.name = req.body.name;
  res.send(courses);
}

// delete a course
const deleteCourse = (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send('item doesn\'t exist');
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(courses);
}

// retrieve the course list
const getCourseList = (req, res) => {
  res.send(courses);
}

// retrieve a course
const getCourse = (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).json({ message: 'requesting course is not found ' });
  res.send(course);
}


export { getCourse, getCourseList, deleteCourse, updateCourse, addCourse };