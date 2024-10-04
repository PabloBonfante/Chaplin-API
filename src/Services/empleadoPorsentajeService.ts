import EmpleadoPorsentaje from "../Models/empleadoporsentaje";

export const createEmpleadoPorsentaje = async (empleadoPorsentajeObj: EmpleadoPorsentaje): Promise<EmpleadoPorsentaje> => {
  const empleadoPorsentaje = await EmpleadoPorsentaje.create(empleadoPorsentajeObj);
  return empleadoPorsentaje;
};

export const getAllEmpleadoPorsentaje = async (): Promise<EmpleadoPorsentaje[]> => {
  const empleadoPorsentajes = await EmpleadoPorsentaje.findAll();
  return empleadoPorsentajes;
};

export const getEmpleadoPorsentajeById = async (id: number): Promise<EmpleadoPorsentaje | null> => {
  const empleadoPorsentaje = await EmpleadoPorsentaje.findByPk(id);
  return empleadoPorsentaje;
};

export const updateEmpleadoPorsentaje = async (id: number, newempleadoPorsentaje: EmpleadoPorsentaje): Promise<EmpleadoPorsentaje | null> => {
  const empleadoPorsentaje = await EmpleadoPorsentaje.findByPk(id);
  if (empleadoPorsentaje !== null) {
    await empleadoPorsentaje.update(newempleadoPorsentaje);
    return empleadoPorsentaje;
  }
  return null;
};

export const deleteEmpleadoPorsentaje = async (id: number): Promise<boolean> => {
  const empleadoPorsentaje = await EmpleadoPorsentaje.findByPk(id);
  if (empleadoPorsentaje !== null) {
    await empleadoPorsentaje.destroy();
    return true;
  }
  return false;
};
