import React, { Component } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { addItem } from '../../../store/cart/action';
import { addItemToWishlist } from '../../../store/wishlist/action';
import { formatCurrency } from '../../../utilities/product-helper';
import ProductWishList from './productWishList';

class ProductWide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isQuickView: false,
        };
    }

    handleAddItemToCart = e => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItem(product));
    };

    handleAddItemToCompare = e => {
        e.preventDefault();
        const { product } = this.props;
        // this.props.dispatch(addItemToCompare(product));
    };

    handleAddItemToWishlist = e => {
        e.preventDefault();
        const { product } = this.props;
        this.props.dispatch(addItemToWishlist(product));
    };

    handleShowQuickView = e => {
        e.preventDefault();
        this.setState({ isQuickView: true });
    };

    handleHideQuickView = e => {
        e.preventDefault();
        this.setState({ isQuickView: false });
    };

    wishListFunction = () => {
        if(this.props.wishlistItems && this.props.wishlistItems.length > 0) {
            let wishListStatus=this.props.wishlistItems.some((value) => value.productId === this.props.product.productId)
            // setCheckWishList(wishListStatus ? 1 : 0)
            return wishListStatus ? 1 : 0 ;
        }
    }

    render() {
        const { product, image , currency } = this.props;
        let productRating = null;
        if (product.badge) {
            product.badge.map(badge => {
                if (badge.type === 'sale') {
                    return (productRating = (
                        <div className="ps-product__badge">{badge.value}</div>
                    ));
                } else if (badge.type === 'outStock') {
                    return (productRating = (
                        <div className="ps-product__badge.out-stock">
                            {badge.value}
                        </div>
                    ));
                } else {
                    return (productRating = (
                        <div className="ps-product__badge.hot">
                            {badge.value}
                        </div>
                    ));
                }
            });
        }
        return (
            <div className="ps-product ps-product--wide">
                {console.log(this.props.wishlistItems)}
                <div className="ps-product__thumbnail">
                    <Link href="/product/[pid]" as={`/product/${product.productSlug}`}>
                        <a>
                            <img
                                src={image}
                                alt="" style={{height:"250px",width:"200px"}}
                            />
                        </a>
                    </Link>
                </div>
                <div className="ps-product__container">
                    <div className="ps-product__content" style={{width:"80%"}}>
                        <Link
                            href="/product/[pid]"
                            as={`/product/${product.productSlug}`}>
                            <a className="ps-product__title">{product.name}</a>
                        </Link>
                        <p className="ps-product__vendor">
                            Sold by:
                            <Link href="/shop">
                                <a>{"Piccosoft"}</a>
                            </Link>
                        </p>
                        <p className="ps-product__vendor">Description</p>
                        <div className="" dangerouslySetInnerHTML={{__html: product.description}} />
                        {/* <ul className="ps-product__desc">
                            <li>
                                Unrestrained and portable active stereo speaker
                            </li>
                            <li> Free from the confines of wires and chords</li>
                            <li> 20 hours of portable capabilities</li>
                            <li>
                                Double-ended Coil Cord with 3.5mm Stereo Plugs
                                Included
                            </li>
                            <li> 3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li>
                        </ul> */}
                    </div>
                    <div className="ps-product__shopping">
                        {product.is_sale === true ? (
                            <p className="ps-product__price sale">
                                {'$ '}
                                {formatCurrency(product.price)}
                                <del className="ml-1">
                                    {'$ '}
                                    {product.sale_price}{' '}
                                </del>
                            </p>
                        ) : (
                            <p className="ps-product__price">
                                {'$ '}
                                {formatCurrency(product.price)}
                                <ProductWishList productId={product.productId} wishListStatus={this.wishListFunction()}/>
                            </p>
                        )}
                        <Link
                            href="/product/[pid]"
                            as={`/product/${product.productId}`}>
                        <a
                            className="ps-btn"
                            // href="#"
                            // onClick={this.handleAddItemToCart.bind(this)}
                            >
                            Add to cart
                        </a>
                        </Link>
                        
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return state.wishlist;
};
export default connect(mapStateToProps)(ProductWide);
