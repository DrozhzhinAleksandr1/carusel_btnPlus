import React from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { styles } from './styles';
import BtnWithPlus from './btnWithPlus/btnWithPlus';
import { WalletsPrototype } from './walletsPrototype';

export class WalletsScreen extends WalletsPrototype {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.btnPlussWrapper}>
                        <BtnWithPlus text='Кошелькам' onPress={this.onPressAddWallets} testID='btnWithPlusWalletsScreen' />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    currentLanguageName: state.language.currentLanguageName,
    balance: state.dataFromWs.balance,
});

export default connect(mapStateToProps)(WalletsScreen);