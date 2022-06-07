import React, {FC} from 'react';
import Carousel from "react-bootstrap/Carousel";
import {Link} from "react-router-dom";

const sliderItems = [
    {
        name: "contacts",
        url: "https://i.imgur.com/dVJ7Ggo.png"
    },
    {
        name: "savings/plans",
        url: "https://i.imgur.com/adJtj1a.png"
    },
];

const CarouselImageSlider: FC = () => {
    const settings = {
        indicators: false,
        fade: true,
        infinite: "true",
        interval: 3000
    }

    return (
        <div>
            <Carousel {...settings}>
                {sliderItems.map((item) => {
                    return (
                        <Carousel.Item key={item.name}>
                            <Link to={`/${item.name}`}>
                                {/* todo: here can be some kind of info page. I can add here something cool, I guess. */}
                                {/* todo: like. imagine here INFO pages about credits, savings and etc. */}
                                <img className="d-block w-100" src={item.url} alt={item.name}/>
                            </Link>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>
    );
}

export default CarouselImageSlider;
