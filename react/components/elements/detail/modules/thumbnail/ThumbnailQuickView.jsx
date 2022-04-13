import React, { Component } from 'react';
import NextArrow from '../../../carousel/NextArrow';
import PrevArrow from '../../../carousel/PrevArrow';


class ThumbnailQuickView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            galleryCarousel: null,
            variantCarousel: null,
        };
    }

    componentDidMount() {
        this.setState({
            galleryCarousel: this.slider1,
            variantCarousel: this.slider2,
        });
    }

    render() {
        const gallerySetting = {
            dots: false,
            infinite: true,
            speed: 400,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />,
        };
        const { product,image } = this.props;
        return (
            <div className="ps-product__thumbnail" data-vertical="false">
                <figure>
                    <div className="ps-wrapper">
                                <div className="item" style={{maxHeight:"525px"}}>
                                    <a href="#">
                                        <img
                                          src={ `${image}`}
                                          alt=""
                                          style={{margin:"auto",maxHeight:"525px"}}
                                        />
                                    </a>
                                </div>
                    </div>
                </figure>
            </div>
        );
    }
}

export default ThumbnailQuickView;
