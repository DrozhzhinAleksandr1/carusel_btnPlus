import React, { Component } from 'react';
import { View, PanResponder, Animated } from 'react-native';
import { styles } from './styles';
import Utils from '../../../../services/utils/utils';

const { width: utilsWidth } = Utils.size;

class SwapCarusel extends Component {
    constructor(props) {
        super(props)
        this.animationDuration = 100;
        this.setTimeoutDuration = this.animationDuration + 100;
        this.containerWidth = utilsWidth * 4.2;
        this.slideWidth = utilsWidth * 0.8;
        this.halfSlideWidth = this.slideWidth / 2
        this.scrollDistane = utilsWidth * 0.85;
        this.leftDistanceForMiddleSlide = utilsWidth * 0.10;
        this.leftDistanceForLeftSlide = utilsWidth * 0.75;
        this.leftDistanceForSecondLeftSlide = this.leftDistanceForLeftSlide + this.scrollDistane;
        this.leftDistanceForRightSlide = utilsWidth * 0.95;
        this.leftDistanceForSecondRightSlide = this.leftDistanceForRightSlide + this.scrollDistane;
        const { caruselArray } = props;
        this.caruselArrayLength = caruselArray.length;
        this.decrasedCaruselArrayLength = this.caruselArrayLength - 1;
        this.state = {
            animatedLeft: new Animated.Value(0),
            left: 0,
            prevLeft: 0,
            caruselArray,
            isChange: false,
            isRouteRight: true,
            isAnimatedUse: false,
            indexOfFourthContent: this.decrasedCaruselArrayLength - 1,
            indexOfFifthContent: this.decrasedCaruselArrayLength,
            indexOfFirstContent: 0,
            indexOfSecondContent: 1,
            indexOfThirdContent: 2,
        }
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => {
                return true;
            },
            onPanResponderMove: (evt, gestureState) => {
                const { left, prevLeft, isAnimatedUse } = this.state;
                if (!isAnimatedUse) {
                    const newLeft = left + gestureState.dx - prevLeft;
                    const newState = {
                        prevLeft: gestureState.dx,
                        left: newLeft,
                    }
                    this.setState(newState);
                    this.middleSlide.setNativeProps({
                        style: {
                            transform: [{ scale: 1.1 }]
                        }
                    });
                }
            },
            onPanResponderRelease: () => this.endMove(),
            onPanResponderTerminate: () => this.endMove(),
        })
    }

    componentDidMount() {
        const { setSwipeFunction } = this.props;
        setSwipeFunction(this.endMove);
    }

    static getDerivedStateFromProps(props, state) {
        let result = null;
        if (props.caruselArray !== state.caruselArray) {
            result = {
                caruselArray: props.caruselArray,
            };
        }
        return result;
    }

    changeOnLeftOrRight = (prevLeft) => {
        const result = {
            isChange: true,
            prevLeft: 0,
            left: this.scrollDistane,
            isRouteRight: true,
        };
        if (prevLeft < 0) {
            result.left = -this.scrollDistane;
            result.isRouteRight = false;
        }
        return result;
    }

    endMove = (propsPrevLeft) => {
        const { left } = this.state;
        this.setState({
            isAnimatedUse: true,
            animatedLeft: new Animated.Value(left),
        }, () => this.startAnimation(propsPrevLeft));
    }

    startAnimation = (propsPrevLeft) => {
        const { animatedLeft, prevLeft } = this.state;
        const newPrevLeft = propsPrevLeft || prevLeft;
        let nextState = {
            prevLeft: 0,
        };
        if ((newPrevLeft > -this.halfSlideWidth) && (newPrevLeft < this.halfSlideWidth)) {
            nextState.left = 0;
        } else {
            nextState = this.changeOnLeftOrRight(newPrevLeft)
        }
        this.middleSlide.setNativeProps({ style: { transform: [{ scale: 1 }] } })
        setTimeout(() => {
            this.setState(nextState, this.replaceContent)
        }, this.setTimeoutDuration);
        Animated.timing(animatedLeft, {
            toValue: nextState.left,
            duration: this.animationDuration,
            useNativeDrive: true,
        }).start();
    }

    replaceContent = () => {
        const { isChange, isRouteRight } = this.state;
        let callbackState = {
            isAnimatedUse: false,
        }
        if (isChange) {
            callbackState = {
                ...callbackState,
                left: 0,
                isChange: false,
            }
            if (isRouteRight) {
                callbackState = {
                    ...callbackState,
                    ...this.setIndexOfContent(true),
                }
            } else {
                callbackState = {
                    ...callbackState,
                    ...this.setIndexOfContent(false),
                }
            }
        }
        this.setState(callbackState)
    }

    setIndexOfContent = (isRouteRight) => {
        const {
            indexOfFourthContent,
            indexOfFifthContent,
            indexOfFirstContent,
            indexOfSecondContent,
            indexOfThirdContent,
        } = this.state;
        const { setIndexOfMiddleSlide } = this.props;
        let result = {}
        if (isRouteRight) {
            result = {
                indexOfFourthContent: this.decreaseOneIndexOfContent(indexOfFourthContent),
                indexOfFifthContent: this.decreaseOneIndexOfContent(indexOfFifthContent),
                indexOfFirstContent: this.decreaseOneIndexOfContent(indexOfFirstContent),
                indexOfSecondContent: this.decreaseOneIndexOfContent(indexOfSecondContent),
                indexOfThirdContent: this.decreaseOneIndexOfContent(indexOfThirdContent),
            }
        } else {
            result = {
                indexOfFourthContent: this.increaseOneIndexOfContent(indexOfFourthContent),
                indexOfFifthContent: this.increaseOneIndexOfContent(indexOfFifthContent),
                indexOfFirstContent: this.increaseOneIndexOfContent(indexOfFirstContent),
                indexOfSecondContent: this.increaseOneIndexOfContent(indexOfSecondContent),
                indexOfThirdContent: this.increaseOneIndexOfContent(indexOfThirdContent),
            }
        }
        if(setIndexOfMiddleSlide){
            setIndexOfMiddleSlide(result.indexOfFirstContent)
        }        
        return result;
    }

    increaseOneIndexOfContent = (indexOfContent) => {
        let result = 0;
        if (indexOfContent < this.decrasedCaruselArrayLength) {
            result = indexOfContent + 1;
        }
        return result;
    }

    decreaseOneIndexOfContent = (indexOfContent) => {
        let result = this.decrasedCaruselArrayLength;
        if (indexOfContent > 0) {
            result = indexOfContent - 1;
        }
        return result;
    }

    render() {
        const {
            isAnimatedUse,
            animatedLeft,
            left,
            caruselArray,
            indexOfFourthContent,
            indexOfFifthContent,
            indexOfFirstContent,
            indexOfSecondContent,
            indexOfThirdContent,
        } = this.state;
        return (
            <View style={styles.container} {...this.panResponder.panHandlers}>
                <Animated.View style={[styles.animatedBlock, { width: this.containerWidth, left: isAnimatedUse ? animatedLeft : left }]} >
                    <View style={[styles.slide, { width: this.slideWidth, left: - this.leftDistanceForSecondLeftSlide }]}>
                        {caruselArray[indexOfFourthContent]}
                    </View>
                    <View style={[styles.slide, { width: this.slideWidth, left: - this.leftDistanceForLeftSlide }]}>
                        {caruselArray[indexOfFifthContent]}
                    </View>
                    <View style={[styles.slide, { width: this.slideWidth, left: this.leftDistanceForMiddleSlide }]} ref={(ref) => { this.middleSlide = ref }}>
                        {caruselArray[indexOfFirstContent]}
                    </View>
                    <View style={[styles.slide, { width: this.slideWidth, left: this.leftDistanceForRightSlide }]}>
                        {caruselArray[indexOfSecondContent]}
                    </View>
                    <View style={[styles.slide, { width: this.slideWidth, left: this.leftDistanceForSecondRightSlide }]}>
                        {caruselArray[indexOfThirdContent]}
                    </View>
                </Animated.View>
            </View>
        )
    }
}

export default SwapCarusel;