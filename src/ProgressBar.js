// Copyright (C) 2025, Bitcoin Nova Developers
//
// Please see the included LICENSE file for more information.

import React from 'react';

import { Animated, StyleSheet, View, Easing } from 'react-native';

import Config from './Config';

export class ProgressBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            progress: new Animated.Value(this.props.initialProgress || 0),
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.progress >= 0 && this.props.progress != prevProps.progress) {
          this.update();
        }
    }

    render() {
        const width = this.props.style.width || 300;

        var fillWidth = this.state.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1 * width],
        });

        return(
            <View style={[
                {
                    backgroundColor: '#BBBBBB',
                    height: 5,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                },
                this.props.style
            ]}>
                <Animated.View style={{
                    height: 5,
                    backgroundColor: this.props.screenProps.theme.primaryColour,
                    width: fillWidth
                }}/>
            </View>
        );
    }

    update() {
        Animated.timing(this.state.progress, {
            easing: Easing.inOut(Easing.ease),
            duration: 500,
            toValue: this.props.progress,
        }).start();
    }
}
