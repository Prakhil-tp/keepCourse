import express from 'express';
import { addCourse, getCourse, updateCourse, deleteCourse, getCourseList, login } from './routes';

const router = express.Router();

router.get('/', getCourseList);
router.get('/:id', getCourse);
router.post('/', addCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

export { router as courseRouter }