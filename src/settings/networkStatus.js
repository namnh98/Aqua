import React, { Component } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { NetworkConnected } from '../settings/index';
import NotifyInternet from '../components/custom/NotifyInternet';
import images from '../res/image/index';
import size from '../res/size';
import I18n from './i18n'

class Network extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      AlertError: false,
      snackBarMessage: '',
    };
    this.notifyInternet = React.createRef();
  }
  handleConnectivityChange = (isConnected) => {
    this.setState({ isConnected: isConnected });
    NetworkConnected.isConnected = isConnected;
    isConnected == true
      ? this.setState(
        {
          AlertError: true,
          snackBarMessage: `${I18n.t('Connected')}`,
        },
        () => {
          this.notifyInternet.current.showNotifyInternet();
        },
      )
      : this.setState(
        {
          AlertError: false,
          snackBarMessage: `${I18n.t('NotConnected')}`,
        },
        () => {
          this.notifyInternet.current.showNotifyInternet();
        },
      );
  };
  componentDidMount() {
    this.state.unsubscribe = NetInfo.addEventListener((state) => {
      this.handleConnectivityChange(state.isConnected);
    });
  }
  async componentWillUnmount() {
    await this.state.unsubscribe();
  }
  render() {
    return (
      <NotifyInternet
        color={this.state.AlertError ? 'green' : 'red'}
        icon={images.ic_wifi}
        label={this.state.snackBarMessage}
        size={size.s30}
        paddingBottom={0}
        time={2000}
        ref={this.notifyInternet}
      />
    );
  }
}
export default React.memo(Network)