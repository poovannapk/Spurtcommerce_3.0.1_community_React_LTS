import React from 'react';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import { isStaticData } from '../../../utilities/app-settings';
import { baseUrl } from '../../../repositories/Repository';
import { imageUrl } from '../../../api/url';
import OptionNameDisplay from '../../shared/headers/modules/optionNamePar';


const ProductCart = ({ product,type }) => {
    return ( 
        <div>
        {type==="cart"?<div className="ps-product--cart">
            <div className="ps-product__thumbnail">
                <Link href="/product/[pid]" as={`/product/${product.productId}`}>
                    <a>
                        {/* <LazyLoad> */}
                            <div className="ps-product__thumbnail-custom-img">
                            {product.processImage?<img src={ imageUrl+"?path="+product.processImage.containerName+"&name="+product.processImage.name+"&width=200&height=400"}  alt=""/>:<img src={ imageUrl+"?path="+product.containerName+"&name="+product.image+"&width=200&height=400"}  alt=""/>}
                            </div>

                        {/* </LazyLoad> */}
                    </a>
                </Link>
            </div>
            <div className="ps-product__content">
                <Link href="/product/[pid]" as={`/product/${product.productId}`}>
                    <a className="ps-product__title">{product.name}</a>
                </Link>
                <OptionNameDisplay optionName={JSON.parse(product&&product.optionName)}/>
            </div>
        </div>:
        <div className="ps-product--cart">
        <div className="ps-product__thumbnail">
            <Link href="/product/[pid]" as={`/product/${product.product.productId}`}>
                <a>
                    {/* <LazyLoad>
                    {product.productImage&&product.productImage.containerName!=="/"?<img src={ imageUrl+"?path="+product.productImage.containerName+"&name="+product.productImage.image+"&width=200&height=400"}  alt=""/>:<img src={"/static/img/no-image.png"}  alt=""/>}

                    </LazyLoad> */}
                    <div className="ps-product__thumbnail-custom-img">
                        {product.productImage&&product.productImage.containerName!=="/"?<img src={ imageUrl+"?path="+product.productImage.containerName+"&name="+product.productImage.image+"&width=200&height=400"}  alt=""/>:<img src={"/static/img/no-image.png"}  alt=""/>}
                    </div>
                </a>
            </Link> 
        </div>
        <div className="ps-product__content" style={{maxWidth:"500px"}}>
            <Link href="/product/[pid]" as={`/product/${product.product.productId}`}>
                <a className="ps-product__title">{product.product.name}</a>
            </Link>
        </div>
    </div>
        }
        </div>
    );
};

export default ProductCart;
