import React from 'react';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import { Modal } from 'antd';
import ProductDetailQuickView from '../detail/ProductDetailQuickView';
import Rating from '../Rating';
import { formatCurrency } from '../../../utilities/product-helper';
import { imageUrl } from '../../../api/url';
import { useState } from 'react';
import ProductWishList from './productWishList';
import  Router  from 'next/router';
import {useEffect} from 'react';


function Product({product,image,currency}){
    const [isQuickView,setIsQuickView]=useState(false)
    const [checkWishList,setCheckWishList] = useState(0)
    let wishListData =useSelector(s => s.wishlist)

    const handleAddItemToCart = (e,id,price,product) => {
        Router.push("/product/[pid]",`/product/${product.productSlug}`)

    };

    const handleShowQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(true)
    };

    const handleHideQuickView = (e) => {
        e.preventDefault();
        setIsQuickView(false) 
    };

    useEffect(()=>{
        if(wishListData && wishListData.wishlistItems.length > 0) {
            let wishListStatus=wishListData.wishlistItems.some((value) => value.productId === product.productId)
            setCheckWishList(wishListStatus ? 1 : 0)
            wishListFunction()
        }
    },[wishListData])

    const wishListFunction = () => {
        console.log(wishListData)
        if(wishListData && wishListData.wishlistItems.length > 0) {
            let wishListStatus=wishListData.wishlistItems.some((value) => value.productId === product.productId)
            return wishListStatus ? 1 : 0 ;
        }
    }

        return (
            <div className="ps-product">
                {console.log(wishListData)}
                <div className="ps-product__thumbnail">
                    <Link href="/product/[pid]" as={`/product/${product.productId}`}>
                        <a>
                                <div className="product-container-whole-project">
                                <img
                                    src={image}
                                    alt="picco" 
                                />
                                </div>
                        </a>
                    </Link>
                    {product.badge ? productBadge : ''}
                    <ul className="ps-product__actions">
                        <li>
                        <Link href="/product/[pid]" as={`/product/${product.productId}`}>

                            <a 
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Add to cart"
                                onClick={e=>handleAddItemToCart(e,product.productId,product.price,product)}
                                >
                                <i className="icon-bag2"></i>
                            </a>
                            </Link>
                        </li>
                        <li>
                            <a
                                href="#"
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Quick View"
                                onClick={handleShowQuickView}>
                                <i className="icon-eye"></i>
                            </a>
                        </li>
                        <li>    
                        <ProductWishList productId={product.productId} wishListStatus={wishListFunction()}/>
                        </li>
                    </ul>
                </div>
                <div className="ps-product__container">
                    <div className="ps-product__content">
                         <Link
                            href="/product/[pid]"
                            as={`/product/${product.productSlug}`}>
                            <a className="ps-product__title">{product.name}</a>
                        </Link>
                        <div className="ps-product__rating">
                            <Rating rating={product.rating}/> 
                            <span>{product.rating}</span>
                        </div>
                        {product.is_sale === true ? (
                            <p className="ps-product__price sale">
                                {currency ? currency.symbol : '$'}
                                {formatCurrency(product.price)}
                                <del className="ml-2">
                                    {currency ? currency.symbol : '$'}
                                    {formatCurrency(product.sale_price)}
                                </del>
                            </p>
                        ) : (
                            <div>
                            {product&&product.flag===""?<p className="ps-product__price">
                                {currency ? currency.symbol : '$'}
                                {formatCurrency(product.price)}
                                
                            </p>:<p className="ps-product__price">
                                { '$'}
                                {product.price}
                            </p>}
                            </div>
                        )}
                    </div>
                    <div className="ps-product__content hover">
                        <Link
                            href="/product/[pid]"
                            as={`/product/${product.productSlug}`}>
                            <a className="ps-product__title">{product&&product.name}</a>
                        </Link>
                        {product.is_sale === true ? (
                            <p className="ps-product__price sale">
                                {currency ? currency.symbol : '$'}
                                {formatCurrency(product.price)}{' '}
                                <del className="ml-2">
                                    {currency ? currency.symbol : '$'}
                                    {product.sale_price}
                                </del>
                            </p>
                        ) : (
                             <div>
                            {product&&product.flag===""?<p className="ps-product__price">
                                {currency ? currency.symbol : '$'}
                                {formatCurrency(product.price)}
                            </p>:<p className="ps-product__price">
                                { '$ '}
                                {product.price}
                            </p>}
                            </div>
                        )}
                    </div>
                </div>
                {console.log(product)}
                <Modal
                    title={product.title}
                    centered
                    footer={null}
                    width={1024}
                    onCancel={handleHideQuickView}
                    visible={isQuickView}>
                    <ProductDetailQuickView product={product} image={product.Images&&product.Images.containerName!=="/"? imageUrl+"?path="+product.Images.containerName+"&name="+product.Images.image+"&width=573&height=673":product.productImage&&product.productImage.containerName!=="/"? imageUrl+"?path="+product.productImage.containerName+"&name="+product.productImage.image+"&width=573&height=673" :  "/static/img/no-image.png"}  wishListStatus = {wishListFunction()}/>
                </Modal>
            </div>
        );
}
const mapStateToProps = (state) => {
    return state.setting;
};
export default connect(mapStateToProps)(Product);
