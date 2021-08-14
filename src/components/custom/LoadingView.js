import React from 'react';
import { View, Text, ActivityIndicator, Modal } from 'react-native';
import I18n from '../../settings/i18n'

const LoadingView = (props) => {
    return (
        <Modal visible={props.visible} statusBarTranslucent transparent>
            <View
                style={{
                    flex: 1,
                    backgroundColor: '#00000036',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color={'#1890FF'} />
                <Text style={{ fontSize: 16, color: 'white', marginTop: 8, fontWeight: 'bold' }}>
                    {props.loadingText || `${I18n.t('Loading')}`}
                </Text>
            </View>
        </Modal>
    );
};

export default LoadingView;
