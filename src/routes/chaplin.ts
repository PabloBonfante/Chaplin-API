import express from 'express';
import { GetAllEmpleado, GetEmpleado, InsertEmpleado, UpdateEmpleado, DeleteEmpleado } from '../controllers/empleadoController';

const router = express.Router();

// Middleware para manejar promesas
const asyncHandler = (fn: Function) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.route('/empleado').get(asyncHandler(GetAllEmpleado));
router.route('/:id').get(asyncHandler(GetEmpleado));
router.route('/').post(asyncHandler(InsertEmpleado));
router.route('/:id').put(asyncHandler(UpdateEmpleado));
router.route('/:id').delete(asyncHandler(DeleteEmpleado));

export default router;
