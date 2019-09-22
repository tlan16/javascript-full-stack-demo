import { Column } from 'typeorm';
import { IsString, IsISO31661Alpha3, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

const types = {
    billing: 'billing',
    shipping: 'shipping',
};

export class Address {
    @Column()
    @IsIn(Object.values(types))
    @ApiModelProperty({ example: types.billing, enum: Object.values(types), description: 'The type of the Address' })
    type: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ example: 'Unit 12, 34 Sesame St', description: 'The first line of the Address' })
    street1: string;

    @Column()
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ description: 'The second line of the Address', required: false })
    street2: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ example: 'Glen Waverley', description: 'The city/suburb of the Address' })
    city: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ example: 'VIC', description: 'The state/province of the Address' })
    state: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @IsISO31661Alpha3()
    @ApiModelProperty({ example: 'AUS', description: 'The ISO 3166-1 alpha-3 country code of the Address' })
    country: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    @ApiModelProperty({ example: '3142', description: 'The post code of the Address' })
    postcode: string;
}
