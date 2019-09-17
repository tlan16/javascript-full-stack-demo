import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CustomerService } from './customer.service';
import { customerProviders } from './customer.providers';
import { CustomerController } from './customer.controller';

@Module({
    imports: [DatabaseModule],
    providers: [
        ...customerProviders,
        CustomerService,
    ],
    controllers: [
        CustomerController,
    ],
})

export class CustomerModule {}
