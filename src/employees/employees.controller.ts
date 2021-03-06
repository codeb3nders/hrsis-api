import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

import { Employee } from './entities/employee.entity';
import { ErrorResponse } from 'src/helpers/error_response';
import { EmployeeResponseHandler } from './response_handler/employee.response';
import { EmployeeI } from './interface/employee.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    // TODO: Add validation

    try {
      return await this.employeesService.create(createEmployeeDto);
    } catch (error) {
      ErrorResponse.conflict(error.message || error);
    }
  }

  @Get()
  async findAll(): Promise<EmployeeI[]> {
    try {
      const response = await this.employeesService.findAll();
      return EmployeeResponseHandler.ok(response);
    } catch (error) {
      ErrorResponse.badRequest(error.message || error);
    }
  }

  @Get('/leaves/')
  async findAllLeaves(): Promise<EmployeeI[]> {
    try {
      const response = await this.employeesService.findAllWithLeaves();
      return EmployeeResponseHandler.ok(response);
    } catch (error) {
      ErrorResponse.badRequest(error.message || error);
    }
  }

  @Get('/leaves/:employeeNo')
  findAllLeavesById(@Param('employeeNo') employeeNo: string) {
    return this.employeesService.findAllLeavesById(employeeNo);
  }

  @Get(':employeeNo')
  findOne(@Param('employeeNo') employeeNo: string) {
    return this.employeesService.findOne(employeeNo);
  }

  @Patch(':employeeNo')
  update(
    @Param('employeeNo') employeeNo: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    return this.employeesService.update(employeeNo, updateEmployeeDto);
  }

  @Delete(':employeeNo')
  remove(@Param('employeeNo') employeeNo: string) {
    return this.employeesService.remove(employeeNo);
  }
}
