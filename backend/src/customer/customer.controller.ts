import {
    Controller,
    Get,
    Post,
    Put,
    Body,
    Param,
    Delete,
    HttpStatus,
    HttpCode,
    UseInterceptors,
    CacheInterceptor,
    Query,
} from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import {
    ApiOperation,
    ApiResponse,
    ApiUseTags,
} from '@nestjs/swagger';
import { CustomerService } from './customer.service';
import { Customer } from './customer.entity';

@ApiUseTags('customer')
@Controller('customer')
@UseInterceptors(CacheInterceptor)
export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}

    @Post()
    @ApiOperation({ title: 'Create customer' })
    @ApiResponse({
        status: 201,
        description: 'The record has been successfully created.',
        type: Customer,
    })
    async create(@Body() customer: Customer): Promise<Customer> {
        return this.customerService.create(customer);
    }

    @Get()
    @ApiResponse({
        status: 200,
        type: [Customer],
    })
    async findAll(@Query('page') page: number = 0, @Query('limit') limit: string = '10'): Promise<Pagination<Customer>> {
        return this.customerService.findAll({page, limit: parseInt(limit, 10)});
    }

    @Get(':id')
    @ApiResponse({
        status: 200,
        type: Customer,
    })
    async findById(@Param('id') id: string): Promise<Customer> {
        return this.customerService.findById(id);
    }

    @Put(':id')
    @ApiResponse({
        status: 200,
        type: Customer,
    })
    async updateById(@Param('id') id: string, @Body() customer: Customer): Promise<Customer> {
        return this.customerService.update(id, customer);
    }

    @Delete(':id')
    @ApiResponse({
        status: HttpStatus.NO_CONTENT,
    })
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteById(@Param('id') id) {
        await this.customerService.deleteById(id);
    }
}
