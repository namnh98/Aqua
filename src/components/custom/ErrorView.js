import React, { useState, forwardRef, useImperativeHandle } from 'react'
import {
    Text,
    TextInput,
    View
} from 'react-native'
const ErrorView = (props) => {
    return (
        <View style={props.style}>
            <Text style={{
                fontSize: props.size,
                color: 'red',
                paddingVertical: props.size * 0.5
            }}>{props.error}</Text>
        </View>
    )
}
ErrorView.defaultProps = {
    size: 12,
}
export default ErrorView