/*
 * spurtcommerce API
 * version 3.0.1
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { MinLength, MaxLength , IsEmail} from 'class-validator';
export class ForgotPassword {
    @MaxLength(60, {
        message: 'Name is maximum 30 character',
    })
    @MinLength(4, {
        message: 'Name is minimum 4 character',
    })
    @IsEmail()
    public email: string;
}
