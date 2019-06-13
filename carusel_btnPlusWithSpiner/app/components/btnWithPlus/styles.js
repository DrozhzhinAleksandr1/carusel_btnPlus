import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 44,
        paddingHorizontal: 15,
    },
    btn: {
        width: '100%',
        height: 44,
        overflow: 'hidden',
        borderRadius: 44,
        backgroundColor: '#FF9900',
        padding: 2,
    },
    content: {
        height: 40,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        // borderWidth: 2,
        borderRadius: 40,
        // borderColor: '#FF9900',
        backgroundColor: '#0B141E',
        position: 'absolute',
        top: 2,
        left: 2,
        zIndex: 2,
        // backgroundColor: 'green',
    },
    text: {
        color: '#FF9900',
        fontSize: 18,
    },
});