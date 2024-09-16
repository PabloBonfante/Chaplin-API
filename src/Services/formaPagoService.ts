import FormaPago from "../Models/formapago";

export const insertFormaPago = async (formaPagoObj: FormaPago): Promise<FormaPago | null> => {
    const existe = await FormaPago.findAll({
        where: {
            Codigo: formaPagoObj.Codigo
        },
    });

    if (existe.length === 0) {
        const formaPago = await FormaPago.create(formaPagoObj);
        return formaPago;
    } else {
        return null;
    }
};

export const getAllFormaPago = async (): Promise<FormaPago[]> => {
    const formasDePagos = await FormaPago.findAll();
    return formasDePagos;
};

export const getFormaPagoById = async (id: number): Promise<FormaPago | null> => {
    const formaPago = await FormaPago.findByPk(id);
    return formaPago;
};

export const updateFormaPago = async (id: number, newFormaPago: FormaPago): Promise<FormaPago | null> => {
    const formaPago = await FormaPago.findByPk(id);
    if (formaPago !== null) {
        await formaPago.update(newFormaPago);
        return formaPago;
    }
    return null;
};

export const deleteFormaPago = async (id: number): Promise<boolean> => {
    const formaPago = await FormaPago.findByPk(id);
    if (formaPago !== null) {
        await formaPago.destroy();
        return true;
    }
    return false;
};
