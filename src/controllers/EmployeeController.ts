import { Request, Response } from 'express';
import employeeService from "../services/EmployeeService";

class EmployeeController {

    async findAllEmployees(req: Request, res: Response): Promise<Response> {
        try {
            const data = await employeeService.findAllEmployees()
            if (data.length == 0) {
                return res.status(404).json({
                    statusCode: 404,
                    message: "Nenhum Funcionário encontrado",
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

    async createEmployee(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body

            if (!data.name || !data.email) {
                return res.status(400).json({
                    statusCode: 400,
                    message: "Faltam campos obrigatórios",
                    description: "Os campos nome e email devem ser preenchidos corretamente",
                });
            }

            await employeeService.createEmployee(data);

            return res.status(201).json({
                statusCode: 201,
                message: "Funcionário criado com sucesso"
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro interno no servidor",
                description: error.message,
            });
        }
    }

    async findEmployeeById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params

            const employee = await employeeService.findEmployeeById(id);
            
            if (!employee) return res.status(404).json({
                statusCode: 404,
                message: "Funcionário não encontrado",
                description: "Nenhum funcionário foi encontrado com este id",
            });
            return res.status(200).json({
                statusCode: 200,
                data: employee
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro interno no servidor",
                description: error.message,
            });
        }
    }

    async updateEmployee(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params

            const data = req.body;
            
            const employee = await employeeService.findEmployeeById(id);

            if (!employee) return res.status(404).json({
                statusCode: 404,
                message: "Funcionário não encontrado",
                description: "Nenhum funcionário foi encontrado com este id",
            });
            await employeeService.updateEmployee(id, data);
            return res.status(200).json({
                statusCode: 200,
                message: "Funcionário atualizado com sucesso",
            });
        } catch (error) {
            return res.status(500).json({
                statusCode: 500,
                message: "Erro interno no servidor",
                description: error.message,
            });
        }
    }

    async deleteEmployee(req: Request, res: Response) {
        try {
            const { id } = req.params

            const employee = await employeeService.findEmployeeById(id);

            if (!employee) return res.status(404).json({
                statusCode: 404,
                message: "Funcionário não encontrado",
                description: "Nenhum Funcionário foi encontrado com este id",
            });
            await employeeService.deleteEmployee(id);
            return res.status(200).json({
                statusCode: 200,
                message: "Funcionário deletado com sucesso",
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

export default new EmployeeController()