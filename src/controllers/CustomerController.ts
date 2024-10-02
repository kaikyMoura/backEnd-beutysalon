import { Request, Response } from 'express';
import CustomerService from "../services/CustomerService";

class CustomerController {

    async findAllCustomers(req: Request, res: Response): Promise<Response> {
        try {
            const data = await CustomerService.findAllCustomers()
            if (data.length == 0) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Nenhum cliente encontrado",
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

    async createCustomer(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body

            if (!data.name || !data.email || !data.phone) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "Faltam campos obrigatórios",
                    description: "Os campos nome, email e telefone devem ser preenchidos corretamente",
                });
            }

            await CustomerService.createCustomer(data);

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

    async findCustomerById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            console.log(id)
            const customer = await CustomerService.findCustomerById(id);
            console.log(customer)
            if (!customer) return res.status(404).json({
                statusCode: 404,
                message: "Cliente não encontrado",
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

    async updateCustomer(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params
            const data = req.body;
            const customer = await CustomerService.findCustomerById(id);
            if (!customer) return res.status(404).json({
                statusCode: 404,
                message: "Cliente não encontrado",
                description: "Nenhum cliente foi encontrado com este id",
            });
            await CustomerService.updateCustomer(id, data);
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

    async deleteCustomer(req: Request, res: Response) {
        try {
            const { id } = req.params

            const customer = await CustomerService.findCustomerById(id);
            if (!customer) return res.status(404).json({
                statusCode: 404,
                message: "Cliente não encontrado",
                description: "Nenhum cliente foi encontrado com este id",
            });
            await CustomerService.deleteCustomer(id);
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

export default new CustomerController()