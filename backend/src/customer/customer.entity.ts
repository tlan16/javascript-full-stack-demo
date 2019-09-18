import { Column, Entity, ObjectID, ObjectIdColumn } from 'typeorm';
import { IsString, IsISO8601, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Customer {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    @ApiModelProperty({ example: 'Frank', description: 'The first name of the Customer' })
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @ApiModelProperty({ example: 'Lan', description: 'The last name of the Customer' })
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @Column()
    @ApiModelProperty({ example: 'frank.lan@domain.com', description: 'The email of the Customer' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Column()
    @ApiModelProperty({ example: 'Mr.', description: 'The title of the Customer', required: false })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    title: string;

    @Column()
    @ApiModelProperty({ example: 'male', description: 'The gender of the Customer' })
    @IsString()
    @IsNotEmpty()
    gender: string;

    @Column()
    @ApiModelProperty({ example: '1990-12-30', description: 'The date of birth of the Customer', type: 'string', format: 'date' })
    @IsISO8601()
    dob: Date;
}
