
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { styles } from './styles';
import BackspaceArrow from '../../../assets/svg/backspaceArrow';
import CheckMark from '../../../assets/svg/checkMark';

const renderBtnContent = (text, index, checkColor) => {
    let result = null;
    if (text === 'IMG') {
        result = <BackspaceArrow />;
    } else if (text === 'OK') {
        result = <CheckMark color={checkColor || '#FFFFFF'} />;
    } else {
        result = (
            <Text
                style={[
                    styles.keyboardButtonText,
                    { lineHeight: (index === 11) ? 25 : 30 }
                ]}
            >{text}</Text>
        )
    }
    return result;
}

class KeyboardButton extends Component {
    constructor(props) {
        super(props);
        const { text, index, checkColor } = props;
        this.state = {
            content: renderBtnContent(text, index, checkColor),
            color: '#FFFFFF',
        }
    }

    onPressFunction = () => {
        const { text, onPress } = this.props;
        return onPress(text);
    }


    static getDerivedStateFromProps(props, state) {
        const { color } = state;
        const { text, index, checkColor } = props;
        const result = {};
        if (color !== checkColor) {
            result.color = checkColor;
            result.content = renderBtnContent(text, index, checkColor);
        }
        return result;
    }

    render() {
        const { index, testID } = this.props;
        const { content } = this.state;
        return (
            <TouchableOpacity
                onPress={this.onPressFunction}
                testID={`keyboardButton${testID}${index}ID`}
                accessibilityLabel={`keyboardButton${testID}${index}ID`}
                style={[
                    styles.container,
                    { backgroundColor: (index === 9 || index === 11) ? 'rgba(0,0,0,0)' : '#142836' }
                ]}
            >
                {content}
            </TouchableOpacity>
        );
    }
}

KeyboardButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    testID: PropTypes.string,
    checkColor: PropTypes.string,
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
}

export default KeyboardButton;