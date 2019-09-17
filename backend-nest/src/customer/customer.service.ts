import { Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
    constructor(
        @Inject('CUSTOMER_REPOSITORY')
        private readonly customerRepository: Repository<Customer>,
    ) {}

    async create(customer: Customer): Promise<Customer> {
        const createdCustomer = new Customer();
        createdCustomer.firstName = customer.firstName;
        createdCustomer.lastName = customer.lastName;
        createdCustomer.email = customer.email;
        createdCustomer.title = customer.title;
        createdCustomer.gender = customer.gender;
        createdCustomer.dob = customer.dob;

        return await this.customerRepository.save(createdCustomer);
    }

    async findAll(): Promise<Customer[]> {
        return await this.customerRepository.find();
    }
}
