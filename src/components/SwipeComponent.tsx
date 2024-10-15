import React, { useMemo, useState } from 'react'
import { Dimensions, Image } from 'react-native'
import Swiper from 'react-native-swiper'
import COLORS from '../assets/colors/Colors'
import IMAGES from '../assets/images/Images'
import { globalStyle } from '../styles/globalStyle'

const { width } = Dimensions.get('window');
const imageWidth = width * 0.916;
const imageHeight = imageWidth * 0.39;

const SwipeComponent = React.memo(() => {
    const imageSlideArray = useMemo(() => [
        IMAGES.SlideShow,
        IMAGES.SlideShow1,
        IMAGES.SlideShow2,
    ], []);
    const [index, setIndex] = useState(0);

  return (
    <Swiper
            removeClippedSubviews={true}
            loop={true}
            autoplay={true}
            autoplayTimeout={3}
            onIndexChanged={setIndex}
            index={index}
            dotColor={COLORS.HEX_LIGHT_GREY}
            activeDotColor={COLORS.BLUE_GRAY}
        >
            {imageSlideArray?.map((imageUrl, index) => (
                <Image
                    source={imageUrl}
                    key={index}
                    style={[{ width: imageWidth, height: imageHeight }, globalStyle.card]}
                    resizeMode="cover"
                />
            ))}
        </Swiper>
    )
})

export default SwipeComponent