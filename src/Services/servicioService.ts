import Servicio from "../Models/Servicio";

export const createServicio = async (servicioObj: Servicio): Promise<Servicio | null> => {

  const existe = await Servicio.findAll({
    where: {
      CodServicio: servicioObj.CodServicio,
      DescServicio: servicioObj.DescServicio
    },
  });

  if (existe.length === 0) {
    const servicio = await Servicio.create(servicioObj);
    return servicio;
  } else {
    return null;
  }
};

export const getAllServicio = async (): Promise<Servicio[]> => {
  const servicios = await Servicio.findAll();
  return servicios;
};

export const getServicioById = async (id: number): Promise<Servicio | null> => {
  const servicio = await Servicio.findByPk(id);
  return servicio;
};

export const updateServicio = async (id: number, newServicio: Servicio): Promise<Servicio | null> => {
  const servicio = await Servicio.findByPk(id);
  if (servicio !== null) {
    await servicio.update(newServicio);
    return servicio;
  }
  return null;
};

export const deleteServicio = async (id: number): Promise<boolean> => {
  const servicio = await Servicio.findByPk(id);
  if (servicio !== null) {
    await servicio.destroy();
    return true;
  }
  return false;
};
