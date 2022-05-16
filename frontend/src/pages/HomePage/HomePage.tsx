import React, {FC, useEffect} from 'react';

import HomePageTheme from "../../component/HomePageTheme/HomePageTheme";
import CarouselImageSlider from "../../component/CarouselImageSlider/CarouselImageSlider";
import {useDispatch} from "react-redux";
import ScrollButton from "../../component/ScrollButton/ScrollButton";

const HomePage: FC = () => {
    return (
        <div>
            <ScrollButton/>
            <CarouselImageSlider/>
            <HomePageTheme/>
        </div>
    );
};

export default HomePage;
