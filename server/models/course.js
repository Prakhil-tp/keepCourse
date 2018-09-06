import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  }
});

const Course = mongoose.model('Course', courseSchema);

const getCourseList = next => {
  Course.find(next);
}

const getCourseById = (id, next) => {
  Course.findById(id, next);
}

const updateCourse = (id, upCourse, next) => {
  Course.update({ id }, course, next);
}

const deleteCourseById = (id, next) => {
  Course.findByIdAndRemove(id, next);
}

const deleteCourseByCondition = (condition, next) => {
  Course.remove(condition, next);
}

const createCourse = (newCourse, next) => {
  new Course(newCourse).save(next);
}

export { 
  Course,
  getCourseById,
  getCourseList,
  updateCourse,
  deleteCourseById,
  deleteCourseByCondition,
  createCourse
}