import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import {FONTFAMILY} from '../../assets/fonts';
import COLORS from '../assets/colors/Colors';
import {TipModel} from '../model/tip_model';
import ContainerComponent from './ContainerComponent';
import TextComponent from './TextComponent';
import SectionComponent from './SectionComponent';
import SpaceComponent from './SpaceComponent';

const {width, height} = Dimensions.get('window');
const BOTTOMSHEET_MAX_HEIGHT = height * 0.8;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;
const imageWidth = width * 0.816;
const imageHeight = imageWidth * 0.39;

interface BottomSheetProps {
  selectedTip: TipModel | null;
}

const BottomSheetComponent = forwardRef(
  ({selectedTip}: BottomSheetProps, ref) => {
    const lastGestureDy = useRef(MAX_DOWNWARD_TRANSLATE_Y);
    const [isVisible, setIsVisible] = useState(false);
    const animatedValue = useRef(
      new Animated.Value(MAX_DOWNWARD_TRANSLATE_Y),
    ).current;

    const springAnimation = (direction: 'up' | 'down') => {
      const toValue =
        direction === 'down'
          ? MAX_DOWNWARD_TRANSLATE_Y
          : -BOTTOMSHEET_MAX_HEIGHT;
      lastGestureDy.current = toValue;
      Animated.spring(animatedValue, {
        toValue: toValue,
        useNativeDriver: true,
      }).start(() => {
        if (direction === 'down') setIsVisible(false);
      });
    };

    const toggleBottomSheet = () => {
      setIsVisible(!isVisible);
      springAnimation(isVisible ? 'down' : 'up');
    };

    useImperativeHandle(ref, () => ({
      toggleBottomSheet,
    }));

    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          animatedValue.setOffset(lastGestureDy.current);
        },
        onPanResponderMove: (e, gesture) => {
          animatedValue.setValue(gesture.dy);
        },
        onPanResponderRelease: (e, gesture) => {
          lastGestureDy.current += gesture.dy;
          animatedValue.flattenOffset();

          if (gesture.dy > 0) {
            gesture.dy <= DRAG_THRESHOLD
              ? springAnimation('up')
              : springAnimation('down');
          } else {
            gesture.dy >= -DRAG_THRESHOLD
              ? springAnimation('down')
              : springAnimation('up');
          }
        },
      }),
    ).current;

    const bottomSheetAnimation = {
      transform: [
        {
          translateY: animatedValue.interpolate({
            inputRange: [-BOTTOMSHEET_MAX_HEIGHT, MAX_DOWNWARD_TRANSLATE_Y],
            outputRange: [-BOTTOMSHEET_MAX_HEIGHT, MAX_DOWNWARD_TRANSLATE_Y],
            extrapolate: 'clamp',
          }),
        },
      ],
    };

    return (
      <ContainerComponent>
        {isVisible && (
          <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
            <View style={styles.draggableArea} {...panResponder.panHandlers}>
              <SpaceComponent height={280} />
              <View style={styles.dragHandle} />
              <SpaceComponent height={10} />
              <View>
                {selectedTip ? (
                  <SectionComponent>
                    <TextComponent
                      title
                      text={selectedTip.title}
                      size={15}
                      font={FONTFAMILY.montserrat_black}
                      color={COLORS.HEX_BLACK}
                    />
                    <SpaceComponent height={10} />
                    <TextComponent
                      text={selectedTip.content_header}
                      size={13}
                      color={COLORS.HEX_LIGHT_GRAY}
                    />
                    <SpaceComponent height={30} />
                    <Image
                      source={{uri: selectedTip.thumbnail}}
                      style={{width: imageWidth, height: imageHeight}}
                    />
                    <SpaceComponent height={30} />
                    <TextComponent
                      text={selectedTip.content_footer}
                      size={13}
                      color={COLORS.HEX_LIGHT_GRAY}
                    />
                  </SectionComponent>
                ) : (
                  <ActivityIndicator size="large" color={COLORS.OCEAN_BLUE} />
                )}
              </View>
            </View>
          </Animated.View>
        )}
      </ContainerComponent>
    );
  },
);

const styles = StyleSheet.create({
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOMSHEET_MAX_HEIGHT,
    bottom: -BOTTOMSHEET_MAX_HEIGHT,
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#a8bed2',
        shadowOpacity: 1,
        shadowRadius: 6,
        shadowOffset: {width: 2, height: 2},
      },
    }),
  },
  draggableArea: {
    width: '100%',
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragHandle: {
    width: 100,
    height: 6,
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
});

export default BottomSheetComponent;
