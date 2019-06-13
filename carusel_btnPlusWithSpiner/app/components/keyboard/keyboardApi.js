import React from 'react';
import KeyboardButton from './keyboardButton/keyboardButton';

const getKeyboardBtns = (onPress, arr, testID, checkColor) => {
    let result = null;
    if (typeof onPress === 'function' && Array.isArray(arr)) {
        result = arr.map((text, index) => {
            const button = (
                <KeyboardButton key={text} {...{ text, index, onPress, testID, checkColor }} />
            )
            return button;
        });
    }
    return result;
}

export default getKeyboardBtns;