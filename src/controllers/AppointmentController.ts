import { Request, Response } from 'express';
import appointmentService from '../services/AppointmentService'

class AppointmentController {

    async findAllAppointments(req: Request, res: Response): Promise<Response> {
        try {
            const data = await appointmentService.findAllAppointments()
            if (data.length == 0) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Nenhum horário encontrado",
                });
            }
            return res.status(200).json({
                statusCode: 200,
                data: data
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro interno no servidor",
                description: error.message,
            });
        }
    }

    async createAppointment(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body

            console.log(data.appointments)

            if (!data.name || !data.customerId || !data.employeeId) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "Faltam campos obrigatórios",
                    description: "Os campos nome e email devem ser preenchidos corretamente",
                });
            }

            await appointmentService.createAppointment(data);

            return res.status(201).json({
                statusCode: 201,
                message: "Horário agendado com sucesso"
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro interno no servidor",
                description: error.message,
            });
        }
    }

    async findAppointmentById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            console.log(id)
            const customer = await appointmentService.findAppointmentById(id);
            console.log(customer)
            if (!customer) return res.status(404).json({
                statusCode: 404,
                message: "Horário não encontrado",
                description: "Nenhum cliente foi encontrado com este id",
            });
            return res.status(200).json({
                statusCode: 200,
                data: customer
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro interno no servidor",
                description: error.message,
            });
        }
    }

    async updateAppointment(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const data = req.body;
            const customer = await appointmentService.findAppointmentById(id);
            if (!customer) return res.status(404).json({
                statusCode: 404,
                message: "Horário não encontrado",
                description: "Nenhum cliente foi encontrado com este id",
            });
            await appointmentService.updateAppointment(id, data);
            return res.status(200).json({
                statusCode: 200,
                message: "Horário atualizado com sucesso",
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro interno no servidor",
                description: error.message,
            });
        }
    }

    async deleteAppointment(req: Request, res: Response) {
        try {
            const { id } = req.params

            const customer = await appointmentService.findAppointmentById(id);
            if (!customer) return res.status(404).json({
                statusCode: 404,
                message: "Horário não encontrado",
                description: "Nenhum cliente foi encontrado com este id",
            });
            await appointmentService.deleteAppointment(id);
            return res.status(200).json({
                statusCode: 200,
                message: "Horário deletado com sucesso",
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro interno no servidor",
                description: error.message,
            });
        }
    }
}

export default new AppointmentController()