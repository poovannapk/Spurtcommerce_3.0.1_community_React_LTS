/*
* spurtcommerce
* http://www.spurtcommerce.com
*
* Copyright (c) 2021 Piccosoft Software Labs Pvt Ltd
* Author Piccosoft Software Labs Pvt Ltd <support@spurtcommerce.com>
* Licensed under the MIT license.
*/
import React from 'react';
import Router from 'next/router';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Slider, Checkbox } from 'antd';
import { Menu } from 'antd';
import { useTranslation } from '../../../../i18n';

import { getProductsByPrice } from '../../../../store/product/action';
import { useEffect } from 'react';
import { useState } from 'react';

function ShopWidget({type,categoryMain,setInitialLoad,brands,manuId,setManuId,maxPrice,setMaxPrice,setCategoryInitial,categoryInitial,currency}){
    const [priceMin,setPriceMin]=useState(0)
    const [priceMax,setPriceMax]=useState()
    const dispatch=useDispatch() 
    const { SubMenu } = Menu;
    const { t } = useTranslation('common');

   const  handleChangeRange=(value)=>{
    setInitialLoad(true)
       setPriceMax(value[1])
       setPriceMin(value[0])
        const params = {
            priceMin: value[0],
            priceMax: value[1],
        };
        dispatch(getProductsByPrice(params));
    }
 

    useEffect(()=> {
        maxPrice!==0&& setPriceMax(maxPrice)
    },[])

        const handleClick = e => {
            console.log('click ', e); 
          };

        const handleCategoryPush=(e,categorySlug)=>{
            setCategoryInitial(categorySlug)
            setInitialLoad(true)
        }  

 
        return (
            <div className="ps-layout__left">
                <aside className="widget widget_shop">
                <h4 className="widget-title">{t('categories')}</h4>

                {type==="normal"?<Menu
        onClick={e=>handleClick(e)}
        style={{ width: 256 }}
        defaultSelectedKeys={[categoryInitial]}
        mode="inline"
      >
        {categoryMain&&categoryMain.map(category => (category.children.length !== 0 ? <SubMenu
          key={"sub1"+category.categoryId}
          title={
            <span>
          <span>{category.name}</span>
            </span>
          }
        >
          {category.children&&category.children.map(cat => (<Menu.ItemGroup key={"g1"+cat.categoryId} title={cat.name}>
        {cat.children&&cat.children.map(subCat => (<Menu.Item key={"1"+subCat.categoryId} onClick={e=>handleCategoryPush(e,subCat.categorySlug)}>{subCat.name}</Menu.Item>))}
          </Menu.ItemGroup>))}
        </SubMenu> : <Menu.Item key={category.categoryId} onClick={e=>handleCategoryPush(e,category.categoryId)} >                
{category.name}</Menu.Item>))}
       
      </Menu>:
      <Menu
      onClick={e=>handleClick(e)}
      style={{ width: 256 }}
      mode="inline"
    >
      {categoryMain&&categoryMain.children.map(category => (<SubMenu
        key={"sub1"+category.categoryId}
        title={
          <span>
        <span>{category.name}</span>
          </span>
        }
      >
      {category.children&&category.children.map(subCat => (<Menu.Item key={"1"+subCat.categoryId} onClick={e=>handleCategoryPush(e,subCat.categorySlug)}>{subCat.name}</Menu.Item>))}
      </SubMenu>))}   
    </Menu>}
                </aside>
                <aside className="widget widget_shop">
                      <figure>
                      <h4 className="widget-title">{t('by-price')}</h4>
                        {maxPrice!==0&&<Slider
                            range
                            defaultValue={[priceMin,maxPrice]}
                            max={maxPrice}
                            onAfterChange={handleChangeRange}

                        />}
                        <p>
                            Price:{currency ? currency.symbol : '$'}{priceMin} - {currency ? currency.symbol : '$'}
                            {priceMax===undefined?maxPrice:priceMax}
                        </p>
                    </figure>
                </aside>
            </div>
        );
    
}

const mapStateToProps = state => {
    return state.product,state.setting;
};
export default connect(mapStateToProps)(ShopWidget);
