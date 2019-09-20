import { Repository } from 'typeorm';
import {Injectable, Inject, HttpException, HttpStatus} from '@nestjs/common';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @Inject('CUSTOMER_REPOSITORY')
        private readonly customerRepository: Repository<Customer>,
    ) {}

    async create(customer: Customer): Promise<Customer> {
        const createdCustomer = new Customer();
        this.customerRepository.merge(createdCustomer, customer);

        return await this.customerRepository.save(createdCustomer);
    }

    async update(id: string, customer: Customer): Promise<Customer> {

        const existingCustomer = await this.customerRepository.findOne(id);

        if (!existingCustomer) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }

        existingCustomer.firstName = customer.firstName;
        existingCustomer.lastName = customer.lastName;
        existingCustomer.email = customer.email;
        existingCustomer.title = customer.title;
        existingCustomer.gender = customer.gender;
        existingCustomer.dob = customer.dob;

        return await this.customerRepository.save(existingCustomer);
    }

    async findById(id: string): Promise<Customer> {
        const existingCustomer = await this.customerRepository.findOne(id);

        if (!existingCustomer) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }

        return existingCustomer;
    }

    async deleteById(id: string) {
        const existingCustomer = await this.customerRepository.findOne(id);

        if (!existingCustomer) {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
            }, HttpStatus.NOT_FOUND);
        }

        await this.customerRepository.delete(id);
    }

    async findAll(options: IPaginationOptions): Promise<Pagination<Customer>> {
        return await paginate<Customer>(this.customerRepository, options);
    }
}
