import React, { Component } from 'react';
import Slider from 'react-slick';
import NextArrow from '../../../carousel/NextArrow';
import PrevArrow from '../../../carousel/PrevArrow';
import Lightbox from 'react-image-lightbox';
import { baseUrl } from '../../../../../repositories/Repository';
import { isStaticData } from '../../../../../utilities/app-settings';
import ThumbnailImage from '../elements/ThumbnailImage';
import { useState } from 'react';
import { useEffect } from 'react';
import { imageUrl } from '../../../../../api/url';

function ThumbnailDefault({product}){
// class ThumbnailDefault extends Component {
//     constructor(props) {
//         super(props);
const [galleryCarousel,setGalleryCarousel]=useState(null)
const [variantCarousel,setVariantCarousel]=useState(null)
const [photoIndex,setPhotoIndex]=useState(0)
const [isOpen,setIsOpen]=useState(false)
let slider1=""
let slider2=""
        // this.state = {
        //     galleryCarousel: null,
        //     variantCarousel: null,
        //     photoIndex: 0,
        //     isOpen: false,
        // };
    // }

    const handleOpenLightbox = (e, imageIndex) => {
        e.preventDefault();
        setIsOpen(true)
        setPhotoIndex(imageIndex)

        // this.setState({ photoIndex: imageIndex, isOpen: true });
    }; 

    useEffect(()=> {
        setVariantCarousel(slider2)
        setGalleryCarousel(slider1)
        // this.setState({
        //     galleryCarousel: this.slider1,
        //     variantCarousel: this.slider2,
        // });
    },[slider1,slider2])

    // render() {
        const gallerySetting = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };

        const variantSetting = {
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 4,
                        dots: false,
                        arrows: false,
                        vertical: false,
                        infinite: false,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 4,
                        dots: false,
                        arrows: false,
                        vertical: false,
                        infinite: false,
                    },
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 4,
                        dots: false,
                        arrows: false,
                        vertical: false,
                        infinite: false,
                    },
                },
            ],
        };
        // const { product } = this.props;
        // const { photoIndex, isOpen } = this.state;
        const productImages = [];
        product&&product.productImage&&product.productImage.map(variant => {
            // if (isStaticData === false) {
                productImages.push(imageUrl+"?path="+variant.containerName+"&name="+variant.image+"&width=500&height=500");
            // }
            // else {
            //     productImages.push(variant.url);
            // }
        });

        return (
            <div className="ps-product__thumbnail" data-vertical="true">
                {console.log(variantCarousel)}
                <figure>
                    <div className="ps-wrapper" >
                        <Slider
                            {...gallerySetting}
                            ref={slider => (setGalleryCarousel(slider))}
                            asNavFor={variantCarousel}
                            className="ps-product__gallery ps-carousel inside">
                            {product&&product.productImage&&product.productImage.map((variant, index) => (
                                <div className="item" key={variant.productId} >
                                    <a
                                        href="#"
                                        onClick={e =>
                                            handleOpenLightbox(e, index)
                                        }>
                                        <ThumbnailImage url={imageUrl+"?path="+variant.containerName+"&name="+variant.image+"&width=500&height=500"} type="display"/>
                                    </a>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </figure>
                <Slider
                    asNavFor={galleryCarousel}
                    ref={slider => (setVariantCarousel(slider))}
                    swipeToSlide={true}
                    arrows={false}
                    slidesToShow={productImages.length}
                    vertical={true}
                    focusOnSelect={true}
                    {...variantSetting}
                    className="ps-product__variants">
                    {product&&product.productImage&&product.productImage.map(variant => (
                        <div className="item" key={variant.productId} >
                            <ThumbnailImage url={imageUrl+"?path="+variant.containerName+"&name="+variant.image+"&width=100&height=100"} type={"small"}/>
                        </div>
                    ))}  
                </Slider>
                {console.log(productImages[photoIndex])}
                {isOpen && (
                    <Lightbox
                        mainSrc={productImages[photoIndex]}
                        nextSrc={
                            productImages[
                                (photoIndex + 1) % productImages.length
                            ]
                        }
                        prevSrc={
                            productImages[
                                (photoIndex + productImages.length - 1) %
                                    productImages.length
                            ]
                        }
                        onCloseRequest={() => setIsOpen(false)}
                        onMovePrevRequest={() =>
                            setPhotoIndex((photoIndex + productImages.length - 1) %
                            productImages.length,)
                            // this.setState({
                            //     photoIndex:
                            //         (photoIndex + productImages.length - 1) %
                            //         productImages.length,
                            // })
                        }
                        onMoveNextRequest={() =>
                            setPhotoIndex((photoIndex + 1) % productImages.length)
                            // this.setState({
                            //     photoIndex:
                            //         (photoIndex + 1) % productImages.length,
                            // })
                        }
                    />
                )}
            </div>
        );
    // }
}

export default ThumbnailDefault;
