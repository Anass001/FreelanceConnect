import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './ImageCarousel.css';

export default class ImageCarousel extends React.Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: this.props.slidesToShow,
            slidesToScroll: this.props.slidesToScroll
        };
        return (
            <Slider {...settings}>
                {this.props.images.map((image, index) => {
                    return (
                        <div key={index}>
                            <img src={image} alt="service" style={
                                {
                                    width: "100%",
                                    height: "400px",
                                    objectFit: "cover",
                                    borderRadius: "8px"
                                }
                            } />
                        </div>
                    )
                })}
            </Slider>
        );
    }
}