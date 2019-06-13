import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Plus from '../../../assets/svg/plus';
import PropTypes from 'prop-types';

import Animated, { Easing } from 'react-native-reanimated';

const { Value, timing, interpolate, concat, floor, sub } = Animated;


export class BtnWithPlus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // top: 0,
            // left: 0,
            // circle: new Value(0),
        }
        this.circle = new Value(0);
    }

    onPress = () => {
        // const { onPress } = this.props;
        // onPress();    
        setTimeout(() => {
            this.ref.setNativeProps({
                opacity: 1
            })
            this.btn.setNativeProps({
                pointerEvents: 'none'
            })
            timing(
                this.circle,
                {
                    duration: 30000,
                    toValue: new Value(10),
                    easing: Easing.inOut(Easing.linear),
                }
            ).start();
            setTimeout(() => {
                this.circle.setValue(0);
                this.ref.setNativeProps({
                    opacity: 0
                })
                this.btn.setNativeProps({
                    pointerEvents: 'auto'
                })
            }, 30200)
        }, 300)
    }



    render() {
        const { text, testID } = this.props;

        const circle = sub(this.circle, floor(this.circle));

        const topPosition = interpolate(circle, {
            inputRange: [0, 0.06, 0.48, 0.52, 1],
            outputRange: [50, 0, 0, 50, 50],
        })
        const leftPosition = interpolate(circle, {
            inputRange: [0, 0.06, 0.5, 1],
            outputRange: [0, 0, 100, 0],
        })

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.onPress} style={styles.btn} testID={testID} accessibilityLabel={testID} ref={(btn) => { this.btn = btn }}>
                    <View style={styles.content}>
                        <Text style={styles.text}>{text}</Text>
                        <Plus color='#FF9900' />
                    </View>
                    <Animated.View ref={(ref) => { this.ref = ref }}
                        style={{
                            width: 25,
                            height: 25,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                            position: "absolute",
                            left: concat(leftPosition, '%'),
                            top: concat(topPosition, '%'),
                            opacity: 0
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}


BtnWithPlus.propTypes = {
    onPress: PropTypes.func,
    text: PropTypes.string,
    testID: PropTypes.string,
};

export default BtnWithPlus