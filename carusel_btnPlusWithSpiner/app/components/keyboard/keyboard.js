import React, { Component } from 'react';
import { View } from 'react-native';
import { styles } from './styles';
import PropTypes from 'prop-types';
import getKeyboardBtns from './keyboardApi';

class Keyboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyboardBtns: null,
        }
    }

    componentDidMount() {
        const { onPress, keyboardMock, testID, checkColor } = this.props;
        this.setKeyboardBtns(onPress, keyboardMock, testID, checkColor);
    }

    componentDidUpdate(prevProps, prevState) {
        const { onPress, keyboardMock, testID, checkColor } = this.props;
        if (prevProps.checkColor !== checkColor) {
            this.setKeyboardBtns(onPress, keyboardMock, testID, checkColor);
        }
    }

    setKeyboardBtns = (onPress, keyboardMock, testID, checkColor) => {
        this.setState({ keyboardBtns: getKeyboardBtns(onPress, keyboardMock, testID, checkColor) });
    }

    render() {
        const { keyboardBtns } = this.state;
        return (
            < View style={styles.keyboard}>
                {keyboardBtns}
            </View >
        )
    }
}

Keyboard.propTypes = {
    onPress: PropTypes.func,
    keyboardMock: PropTypes.array,
    testID: PropTypes.string,
    checkColor: PropTypes.string,
}

export default Keyboard;