import { Controller, Get, Post, Body } from '@nestjs/common';
import {
    ApiOperation,
    ApiResponse,
    ApiUseTags,
} from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';

@ApiUseTags('customer')
@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    @ApiOperation({ title: 'Create customer' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: Customer,
    })
    create(@Body() customer: Customer) {
        return this.customerService.create(customer);
    }

    @Get()
    @ApiResponse({
        status: 200,
        type: [Customer],
    })
    findAll(): Promise<Customer[]> {
        return this.customerService.findAll();
    }
}
