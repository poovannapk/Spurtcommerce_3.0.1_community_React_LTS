/*
 * SpurtCommerce
 * version 3.0.1
 * http://www.spurtcommerce.com
 *
 * Copyright (c) 2019 PICCOSOFT
 * Author piccosoft <support@spurtcommerce.com>
 * Licensed under the MIT license.
 */

export class BannerdeleteResponseModel {
  public bannerdelete: any = {};

  constructor(deletebanner: any) {
    this.bannerdelete = deletebanner || '';
  }
}
