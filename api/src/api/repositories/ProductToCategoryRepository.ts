/*
 * spurtcommerce API
 * version 3.0.1
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { ProductToCategory } from '../models/ProductToCategory';

@EntityRepository(ProductToCategory)
export class ProductToCategoryRepository extends Repository<ProductToCategory>  {

}
