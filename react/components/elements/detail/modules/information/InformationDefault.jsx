import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Rating from '../../../Rating';
import { addItem, increaseItemQty, decreaseItemQty } from '../../../../../store/cart/action';
import { useState } from 'react';
import { cartAdd } from '../../../../helper/cartHelper';
import {notification } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from '../../../../../i18n';
import ProductWishList from '../../../products/productWishList';
import {modalSuccess} from '../../../../../api/intercept';


function InformationDefault({product,setShowModal,setShowPriceModal}){
    const [colorTheme,setColorTheme]=useState()
    const dispatch=useDispatch()
    const { t } = useTranslation('common');
    const [quantity,setQuantity]=useState(1)
    const [pin,setPin]=useState("")
    const [pinInfo,setPinInfo]=useState("")
    const [checkStatus,setCheckStatus]=useState("")
    const [availValue,setAvailValue]=useState("")
    const [priceAdded,setPriceAdded]=useState("")
    const [productsPrice,setProductsPrice]=useState(product.price)
    const [optionStateArray,setOptionStateArray]=useState([])
    const [arrayReload,setArrayReload]=useState(0)
    const [optionName,setOptionName]=useState()
    const [productOptionValueId,setProductOptionId]=useState([])
    const [productOptionIdRefer,setProductOptionIdRefer]=useState([])
    const [buttonLoader,setButtonLoader]=useState(false)
    let currentColor=useSelector(s=>s.palette.currentColor)
    // let arrayChange=JSON.stringify(optionStateArray)
    let optionArray=[]

    

    const res = {};
        product&&product.productImage&&product.productImage.forEach(obj => {
        res["name"] = obj.image;res["containerName"]=obj.containerName
        })
        console.log(res)
    

    const quantityTier = () => {
        product.productTirePrices.sort(function (a, b) {
            return a.quantity - b.quantity
        })

        var min = product.productTirePrices[0]
        var min2 = product.productTirePrices[1]
        var min3 = product.productTirePrices[2]
        var min4 = product.productTirePrices[3]
        // console.log(min,min2)           
        setQuantity(quantity + 1)
        //  console.log(quantity,min.quantity)

        if (product && product.productTirePrices.length === 4) {
            if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
                // if(min2!==undefined)
                // console.log(quantity,min.quantity)
                product.price = min.price

            }

            if (quantity + 1 >= min2.quantity && quantity + 1 < min3.quantity) {
                // product.price=productsPrice
                product.price = min2.price
            }

            if (quantity + 1 >= min3.quantity && quantity + 1 < min4.quantity) {
                product.price = min3.price

            }

            if (quantity + 1 >= min4.quantity) {
                product.price = min4.price
            }

        }
        if (product && product.productTirePrices.length === 3) {
            if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
                // if(min2!==undefined)
                // console.log(quantity,min.quantity)
                product.price = min.price

            }

            if (quantity + 1 >= min2.quantity && quantity + 1 < min3.quantity) {
                // product.price=productsPrice
                product.price = min2.price
            }

            if (quantity + 1 >= min3.quantity) {
                product.price = min3.price

            }

        }
        if (product && product.productTirePrices.length === 2) {
            if (quantity + 1 >= min.quantity && quantity + 1 < min2.quantity) {
                // if(min2!==undefined)
                // console.log(quantity,min.quantity)
                product.price = min.price

            }

            if (quantity + 1 >= min2.quantity) {
                // product.price=productsPrice
                product.price = min2.price
            }
        }
        if (product && product.productTirePrices.length === 1) {
            if (quantity + 1 >= min.quantity) {
                // if(min2!==undefined)
                // console.log(quantity,min.quantity)
                product.price = min.price

            }


        }

    }

    const quantityDecrementTier=()=>{
        product.productTirePrices.sort(function (a, b) {
            return a.quantity - b.quantity
        })
        
        var min =  product.productTirePrices[0]
        var min2=product.productTirePrices[1]
        var min3=product.productTirePrices[2]
        var min4=product.productTirePrices[3]
        setQuantity(quantity-1)
        console.log(quantity-1,min.quantity,product.productTirePrices.length)


        if(product&&product.productTirePrices.length===4){
            if(quantity+1>=min.quantity&&quantity+1<min2.quantity){
                // if(min2!==undefined)
                // console.log(quantity,min.quantity)
                product.price=min.price
    
            }
    
            if(quantity+1>=min2.quantity&&quantity+1<min3.quantity){
                // product.price=productsPrice
                product.price=min2.price
            }
    
            if(quantity+1>=min3.quantity&&quantity+1<min4.quantity){
                product.price=min3.price
    
            }
    
            if(quantity+1>=min4.quantity){
                product.price=min4.price
            }
    
          }
          if(product&&product.productTirePrices.length===3){
            if(quantity+1>=min.quantity&&quantity+1<min2.quantity){
                // if(min2!==undefined)
                // console.log(quantity,min.quantity)
                product.price=min.price
    
            }
    
            if(quantity+1>=min2.quantity&&quantity+1<min3.quantity){
                // product.price=productsPrice
                product.price=min2.price
            }
    
            if(quantity+1>=min3.quantity){
                product.price=min3.price
    
            }
    
          }
          if(product&&product.productTirePrices.length===2){
            if(quantity-1>=min.quantity&&quantity-1<min2.quantity){
                // if(min2!==undefined)
                // console.log(quantity,min.quantity)
                product.price=min.price
    
            }
    
            if(quantity-1>=min2.quantity){
                // product.price=productsPrice
                product.price=min2.price
            }
            if(quantity-1<min.quantity){
                product.price=productsPrice

            }
          }
          if(product&&product.productTirePrices.length===1){
            if(quantity-1>=min.quantity){
                // if(min2!==undefined)
                // console.log(quantity,min.quantity)
                product.price=min.price
    
            }
    
    
          }

    }


const availableInitial=()=>{
        if(product.productOption!==undefined&&product.productOption.length!==0){
            var len = product.productOption.length;
            let optionIdArray=[]
            let optionIdArrayRefer=[]

            product.productOption.forEach((option)=>{
                if(option.required===1){
                    option.optionValue.forEach((opVal,index)=>{
                        if(index===0){
                            if(opVal.pricePrefix==="0"){
                                optionArray.push({
                                    optionValueId:opVal.productOptionId, optionValueName: opVal.optionValueName,price:"-"+opVal.price
                                })
                                // opVal.optionValue.forEach((optionDetailId)=>{
                                //     optionIdArray.push(optionDetailId.productOptionValueId)

                                // })
                                optionIdArray.push(opVal.productOptionValueId)
                                optionIdArrayRefer.push({productOptionId:opVal.productOptionId,productOptionValueId:opVal.productOptionValueId})
                                

                            }
                            else{
                                optionArray.push({
                                    optionValueId:opVal.productOptionId, optionValueName: opVal.optionValueName,price:"+"+opVal.price
                                })
                                
                                optionIdArray.push(opVal.productOptionValueId)
                                optionIdArrayRefer.push({productOptionId:opVal.productOptionId,productOptionValueId:opVal.productOptionValueId})


                            }
                            
                        }
                        
                    })

                }
            })
            setOptionStateArray(optionArray)
            setProductOptionId(optionIdArray)
            setProductOptionIdRefer(optionIdArrayRefer)
            setArrayReload(1)
        }
    }


            // for (var i = 0; i < len; i++) {
                // optionArray.push({
                //     value: countryData[i].countryId,
                //     label: countryData[i].name,
                // });
                // if(product.productOption[i].required===1){

                    // if(product.productOption[i].optionValue.length!==0){
                    //     var opLen=product.productOption[i].optionValue.length
                    //     for (var j = 0; j < opLen; i++) {
                    //         // optionArray.push({
                    //         //     optionValueId: product.productOption[i].optionValue[j].optionValueName,
                    //             // label: countryData[i].name,
                    //         // });
                    //         // console.log(opLen)

                    //     }

                    // }

                // }

                const modalWarnings = (type,message) => {
                    notification[type]({
                        message: "Cannot add more than 3 product",
                        description: '',
                        duration: 2,
                    });
                };
 
    const handleAddItemToCart = (e,id,price,product) => {
        console.log(product.price)
        e.preventDefault();
        // setButtonLoader(true)
        product.availValue=availValue
        product.initialPrice=productsPrice
        product.processImage=res
        product.optionIdArrayValue=productOptionValueId
        product.selectedOption=optionStateArray
        product.optionName=JSON.stringify(optionName)
        console.log(product.price)
        cartAdd(product,quantity,availValue)
        // setButtonLoader(true)
        dispatch(addItem(1));
        product.price=parseFloat(productsPrice)
        modalSuccess('success',"Successfully added the product to cart")
    };

    const handleIncreaseItemQty = (e,product) => { 
        dispatch(increaseItemQty(product));
        dispatch(addItem(1))
        setQuantity(quantity+1)
    };

    const handleDecreaseItemQty = e => {
            quantity>1&& setQuantity(quantity-1)
            dispatch(decreaseItemQty(product));
            dispatch(addItem(1))
    };

    useEffect(()=>{
        setArrayReload(0)
        const len=optionStateArray&&optionStateArray.length
        let detailArray=[]
        let valueArray=[]
        for (var i = 0; i < len; i++) {
            detailArray.push(parseFloat(optionStateArray[i].price))
            valueArray.push(optionStateArray[i].optionValueName)
        }
        var sum = detailArray.reduce(function(a, b){
            return a + b;
        }, 0);
        setAvailValue(sum)
        const productTransApi={totalOptions:sum,options:product.productOption,optionValueArray:valueArray}
        setOptionName(productTransApi)

    },[arrayReload])

    useEffect(()=>{
        var rad=document.getElementById('radioVal0');
        
        if(rad&&rad.value!==null||rad&&rad.value!==""){
            // console.log(rad.value)
            setAvailValue(rad.value)
            setPriceAdded(parseFloat(product.price)+parseFloat(rad.value))
        }


        var sel = document.getElementById('scripts-select-value');
        if(sel&&sel.value!==null||sel&&sel.value!==""){
            // console.log(sel)
            setAvailValue(sel.value)
            setPriceAdded(product.price+sel.value)
        }

        availableInitial()

    },[])

    // render() {
        // const { product, currency } = this.props;
        const currency=""
        return (
            <div className="ps-product__info">
                {console.log(quantity)}
                {/* {console.log(optionStateArray,productOptionValueId)} */}
                <h1>{product.name}</h1>
                <div className="ps-product__meta">
                    {/* <p> */}
                        {/* {t('brand')}: */}
                        {/* <Link href="/shop"> */}
                            {/* <a className="ml-2 text-capitalize">
                                {"PICCOSOFT"}
                            </a> */}
                        {/* </Link> */}
                    {/* </p> */}
                    {product.hasStock===1&&product.stockStatus==="outOfStock"&&<p style={{color:"red"}}>Out Of Stock</p>}
                    <div className="ps-product__rating">
                        <Rating rating={product.rating}/>
                        <span>{product.rating}</span> 
                    </div>
                </div>
                {product.is_sale === true ? (
                    <h4 className="ps-product__price sale">
                        <del className="mr-2">
                            {currency ? currency.symbol : '$'}
                            {product.sale_price}
                        </del>
                        {currency ? currency.symbol : '$'}
                        {/* {parseInt(product.price)+availValue} */}
                    </h4>
                ) : (
                    <div>
                        <h4 className="ps-product__price">
                            {currency ? currency.symbol : '$'}
                            {product.price}
                        </h4>
                    </div>
                )}
                <div className="ps-product__shopping">
                    <figure>
                        <figcaption>{t('quantity')}</figcaption>
                        <div className="form-group--number">
                            <button
                                className="up"
                                onClick={e=>handleIncreaseItemQty(e,product)}>
                                <i className="fa fa-plus"></i>
                            </button>
                            <button
                                className="down"
                                onClick={e=>handleDecreaseItemQty(e,product)}>
                                <i className="fa fa-minus"></i>
                            </button>
                            
                            <input
                                className="form-control"
                                type="text"
                                placeholder={quantity}
                                disabled
                            />
                        </div>
                    </figure>
                    {/* {product.pincodeBasedDelivery===0 && */}
                    <a
                        className={`ps-btn  ${currentColor}`}
                        href="#"
                        onClick={e=>handleAddItemToCart(e,product.productId,product.price,product)} disabled={buttonLoader===true?"disabled":""}>
                            {buttonLoader===false ?t('add-to-cart') :"Adding "} 
                           {buttonLoader===true && <img  src="/static/img/buttonLoaders.gif" alt="" style={{height:"30px",width:"30px",verticalAlign:"middle"}}/>}
                    </a>
                   {/* } */}
                    {/* {product.pincodeBasedDelivery===1 &&checkStatus==="success"&&
                    <a
                        className={`ps-btn  ${currentColor}`}
                        href="#"
                        onClick={e=>handleAddItemToCart(e,product.productId,product.price,product)} disabled={buttonLoader===true?"disabled":""}>
                        {buttonLoader===false ?t('add-to-cart') :"Adding "} 
                        {buttonLoader===true && <img  src="/static/img/buttonLoaders.gif" alt="" style={{height:"30px",width:"30px",verticalAlign:"middle"}}/>}

                    </a>
                   }  */}
                    {/* {product.quotationAvailable===1&&<a
                        className={`ps-btn ${currentColor}`}
                        href="#"
                        onClick={e=>setShowModal(true)}
                        >
                       {t('quotation')}
                    </a>}
                    {product.hasStock===1&&product.stockStatus==="outOfStock"&&product.enableBackOrders===1?
                    <Link href="/account/stock-checkout">
                        <a
                        className={`ps-btn ps-btn--black ${currentColor}`}
                        // href="#"
                        onClick={e=>handleBackOrder(product)}>
                        {t('buy-now')}
                    </a>
                    </Link>
                     :""} */}
                    <div className="ps-product__actions">
                    <ProductWishList productId={product.productId} wishListStatus={product.wishListStatus}/>
                        {/* <a
                            href="#"
                            onClick={e=>handleAddItemToCompare(e,product.productId)}>
                            <i className="icon-chart-bars"></i>
                        </a> */}
                    </div>
                </div>
                
                
                <div className="ps-product__specification">
                    {/* <Link href="/page/blank">[

                    ]
                        <a className="report">Report Abuse</a>
                    </Link> */}
                   {/* <p className="categories">
                        <strong> Categories:</strong>
                        <Link href="/shop">
                            <a>Consumer Electronics</a>
                        </Link>
                        <Link href="/shop">
                            <a>Refrigerator</a>
                        </Link>
                        <Link href="/shop">
                            <a>Babies & Moms</a>
                        </Link>
                    </p> */}
                    {/* <p className="tags">
                        <strong> Tags</strong>
                        <Link href="/shop">
                            <a>sofa</a>
                        </Link>
                        <Link href="/shop">
                            <a>technologies</a>
                        </Link>
                        <Link href="/shop">
                            <a>wireless</a>
                        </Link>
                    </p> */}
                </div>
                {/* <div className="ps-product__sharing">
                    <a className="facebook" href="#">
                        <i className="fa fa-facebook"></i>
                    </a>
                    <a className="twitter" href="#">
                        <i className="fa fa-twitter"></i>
                    </a>
                    <a className="google" href="#">
                        <i className="fa fa-google-plus"></i>
                    </a>
                    <a className="linkedin" href="#">
                        <i className="fa fa-linkedin"></i>
                    </a>
                    <a className="instagram" href="#">
                        <i className="fa fa-instagram"></i>
                    </a>
                </div> */}

                {product.pincodeBasedDelivery===0 &&<div className="ps-product__actions-mobile">
                    <a
                        className={`ps-btn ps-btn--black ${currentColor}`}
                        href="#"
                        onClick={e=>handleAddItemToCart(e,product.productId,product.price,product)} disabled={buttonLoader===true?"disabled":""}>
                        {buttonLoader===false ?t('add-to-cart') :"Adding "} 
                        {buttonLoader===true && <img  src="/static/img/buttonLoaders.gif" alt="" style={{height:"30px",width:"30px",verticalAlign:"middle"}}/>}
                    </a>
                    {/* <a
                        className="ps-btn"
                        href="#"
                        onClick={e=>handleAddItemToCart(e,product.productId,product.price,product)}>
                        Buy Now
                    </a> */}
                </div>}

                {product.pincodeBasedDelivery===1 &&checkStatus==="success"&&<div className="ps-product__actions-mobile">
                    <a
                        className={`ps-btn ps-btn--black ${currentColor}`}
                        href="#"
                        onClick={e=>handleAddItemToCart(e,product.productId,product.price,product)} disabled={buttonLoader===true?"disabled":""}>
                        {buttonLoader===false ?t('add-to-cart') :"Adding "} 
                        {buttonLoader===true && <img  src="/static/img/buttonLoaders.gif" alt="" style={{height:"30px",width:"30px",verticalAlign:"middle"}}/>}

                    </a>
                    {/* <a
                        className="ps-btn"
                        href="#"
                        onClick={e=>handleAddItemToCart(e,product.productId,product.price,product)}>
                        Buy Now
                    </a> */}
                </div>}
            </div>
        );
    // }
}

const mapStateToProps = state => {
    return state.setting;
};

export default connect(mapStateToProps)(InformationDefault);
