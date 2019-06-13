import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0B141E',
    },
    slide: {
        top: '10%',
        height: '80%',
        backgroundColor: '#5D5C71',
        position: 'absolute',
        zIndex: 2,
    },
    animatedBlock: {
        height: '100%',
        position: 'absolute',
        zIndex: 1,
    }
});