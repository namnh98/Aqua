import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import allReducers from './redux/reducers'
import rootSaga from './redux/middleware/saga/rootSaga'
import Network from './settings/networkStatus'
const sagaMiddleware = createSagaMiddleware()
export let store = createStore(allReducers, applyMiddleware(sagaMiddleware))
import AppContainer from './containers/App'
import { Text, TextInput } from 'react-native'
import NotificationService from './common/NotificationService'
import { handleNotify } from './common/Firebase'
import axios from 'axios'
import { API_URL, userProfile } from './settings/index'
import jwt_decode from "jwt-decode";

export default class Root extends React.Component {
   constructor(props) {
      super(props)
      TextInput.defaultProps = TextInput.defaultProps || {}
      TextInput.defaultProps.allowFontScaling = false
      Text.defaultProps = Text.defaultProps || {}
      Text.defaultProps.allowFontScaling = false
      axios.interceptors.response.use(
         function (successRes) {
            // console.log(successRes)
            return successRes;
         },
         function (errorRes) {
            // console.log('error interceptor: ', errorRes)
            const { data, status, config } = errorRes.response;
            switch (status) {
               case 401: {
                  if (!config['Authorization']) {
                     return Promise.reject(errorRes);
                  }
                  return axios.post(`${API_URL}/user/refresh-token`, {},
                     {
                        headers: {
                           'Authorization': config.headers.Authorization,
                           'isRefreshToken': 'true'
                        }
                     }
                  )
                     .then(function (response) {
                        config.headers['Authorization'] = 'Bearer ' + response.data.access_token;
                        userProfile.user_name = jwt_decode(response.data.access_token).sub;
                        userProfile.access_token = response.data.access_token;
                        // console.log('token moi : =====================>  ', userProfile.access_token);
                        return axios.request(config);
                        // handle response
                     }).catch(function (error) {
                        if (error.response.status == 400) {
                           return axios.request(config);
                        }
                     }).finally(function () {
                     });
               }
               default: {
                  return Promise.reject(errorRes);
               }
            }
         }
      );

   }

   componentDidMount() {
      handleNotify()

   }

   render() {
      return (
         <Provider store={store}>
            <AppContainer />
            <Network />
         </Provider>
      )
   }
}

sagaMiddleware.run(rootSaga)
