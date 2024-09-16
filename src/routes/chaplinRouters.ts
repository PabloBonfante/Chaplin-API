import express from 'express';
import { getAllEmpleado, getEmpleadoById, InsertEmpleado, updateEmpleado, deleteEmpleado } from '../controllers/empleadoController';
import { createServicio, deleteServicio, getAllServicio, getServicioById, updateServicio } from '../controllers/servicioController';
import { createempleadoPorsentaje, deleteempleadoPorsentaje, getAllempleadoPorsentaje, getempleadoPorsentajeById, updateempleadoPorsentaje } from '../controllers/EmpleadoPorsentajeController';
import { createRegistroDeBarberia, deleteRegistroDeBarberia, getAllRegistroDeBarberia, getRegistroDeBarberiaById, updateRegistroDeBarberia, getAllRegistroDeBarberiaExtended } from '../controllers/registroDeBarberiaController';
import { InsertFormaPago, deleteFormaPago, getAllFormaPago, getFormaPagoById, updateFormaPago } from '../controllers/formaPagoController';
import { getAllUsuario, getUsuarioById, InsertUsuario, updateUsuario, deleteUsuario } from '../controllers/usuarioController';

const router = express.Router();

// Middleware para manejar promesas
const asyncHandler = (fn: Function) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Empleado
router.route('/empleado/').get(asyncHandler(getAllEmpleado));
router.route('/empleado/:id').get(asyncHandler(getEmpleadoById));
router.route('/empleado/').post(asyncHandler(InsertEmpleado));
router.route('/empleado/:id').put(asyncHandler(updateEmpleado));
router.route('/empleado/:id').delete(asyncHandler(deleteEmpleado));

// Usuario
router.route('/usuario/').get(asyncHandler(getAllUsuario));
router.route('/usuario/:id').get(asyncHandler(getUsuarioById));
router.route('/usuario/').post(asyncHandler(InsertUsuario));
router.route('/usuario/:id').put(asyncHandler(updateUsuario));
router.route('/usuario/:id').delete(asyncHandler(deleteUsuario));

// Servicio
router.route('/servicio/').get(asyncHandler(getAllServicio));
router.route('/servicio/:id').get(asyncHandler(getServicioById));
router.route('/servicio/').post(asyncHandler(createServicio));
router.route('/servicio/:id').put(asyncHandler(updateServicio));
router.route('/servicio/:id').delete(asyncHandler(deleteServicio));

// EmpleadoPorsentaje
router.route('/empleado-porsentaje/').get(asyncHandler(getAllempleadoPorsentaje));
router.route('/empleado-porsentaje/:id').get(asyncHandler(getempleadoPorsentajeById));
router.route('/empleado-porsentaje/').post(asyncHandler(createempleadoPorsentaje));
router.route('/empleado-porsentaje/:id').put(asyncHandler(updateempleadoPorsentaje));
router.route('/empleado-porsentaje/:id').delete(asyncHandler(deleteempleadoPorsentaje));

// RegistroDeBarberia
router.route('/registro-barberia/').get(asyncHandler(getAllRegistroDeBarberia));
router.route('/registro-barberia/extended').get(asyncHandler(getAllRegistroDeBarberiaExtended));
router.route('/registro-barberia/:id').get(asyncHandler(getRegistroDeBarberiaById));
router.route('/registro-barberia/').post(asyncHandler(createRegistroDeBarberia));
router.route('/registro-barberia/:id').put(asyncHandler(updateRegistroDeBarberia));
router.route('/registro-barberia/:id').delete(asyncHandler(deleteRegistroDeBarberia));

// Forma pago
router.route('/forma-pago/').get(asyncHandler(getAllFormaPago));
router.route('/forma-pago/:id').get(asyncHandler(getFormaPagoById));
router.route('/forma-pago/').post(asyncHandler(InsertFormaPago));
router.route('/forma-pago/:id').put(asyncHandler(updateFormaPago));
router.route('/forma-pago/:id').delete(asyncHandler(deleteFormaPago));

export default router;
