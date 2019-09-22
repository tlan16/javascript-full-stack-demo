import { CustomerController} from './customer.controller';
import { CustomerService} from './customer.service';
import { Repository} from 'typeorm';
import { Customer, genders } from './customer.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import {ObjectId} from 'mongodb';
import * as faker from 'faker';
import {Address, types as addressTypes} from '../address/address.entity';

describe('CustomerController', () => {
    let customerController: CustomerController;
    let customerService: CustomerService;
    let customerRepository: Repository<Customer>;

    beforeEach(() => {
        customerRepository = new Repository();
        customerService = new CustomerService(customerRepository);
        customerController = new CustomerController(customerService);
    });

    describe('findAll', () => {
        it('should return an array of customers', async () => {
            const result = new Pagination(
                [getCustomer()],
                1,
                1,
                1,
            );
            jest.spyOn(customerService, 'findAll').mockImplementation(async () => result);
            expect(await customerController.findAll()).toBe(result);
        });
    });

    describe('create', () => {
        it('should return the created customer', async () => {
            const result = getCustomer();
            jest.spyOn(customerService, 'create').mockImplementation(async () => result);
            expect(await customerController.create(getCustomer())).toBe(result);
        });
    });

    describe('findById', () => {
        it('should return the customer found', async () => {
            const result = getCustomer();
            jest.spyOn(customerService, 'findById').mockImplementation(async () => result);
            expect(await customerController.findById(result.id.toString())).toBe(result);
        });
    });

    describe('updateById', () => {
        it('should return the updated customer', async () => {
            const customer = getCustomer();
            const result = {...getCustomer(), id: customer.id};

            jest.spyOn(customerService, 'update').mockImplementation(async () => result);
            expect(await customerController.updateById(result.id.toString(), customer)).toBe(result);
        });
    });

    describe('deleteById', () => {
        it('should return nothing', async () => {
            const customer = getCustomer();

            // tslint:disable-next-line:no-empty
            jest.spyOn(customerService, 'deleteById').mockImplementation(async () => {});
            expect(await customerController.deleteById(customer.id.toString())).toBe(undefined);
        });
    });

    function getAddress() {
        const address = new Address();
        address.type = faker.random.arrayElement(Object.values(addressTypes));
        address.street1 = faker.address.streetAddress();
        address.street2 = faker.address.secondaryAddress();
        address.city = faker.address.city();
        address.state = faker.address.state();
        address.country = faker.address.countryCode();
        address.postcode = faker.address.zipCode();

        return address;
    }

    function getCustomer() {
        const address = getAddress();
        const customer = new Customer();
        customer.id = ObjectId;
        customer.firstName = faker.name.firstName();
        customer.lastName = faker.name.lastName();
        customer.email = faker.internet.email();
        customer.title = faker.name.title();
        customer.gender = faker.random.arrayElement(Object.values(genders));
        customer.dob = faker.date.past();
        customer.addresses = [address];

        return customer;
    }
});
