import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { I18nProvider } from '@lingui/react';
import catalogEs from 'i18n/es/messages.js';
import catalogEn from 'i18n/en/messages.js';
import configureStore from 'store/configure-store';
import App from 'views/app';

/**
 * Root class of the application in which we create the store of the app and the main routing system
 */
class Root extends Component {
  render() {
    const catalogs = {
      en: catalogEn,
      es: catalogEs,
    };

    return (
      <Provider store={configureStore({})}>
        <HashRouter>
          <I18nProvider language="en" catalogs={catalogs}>
            <App />
          </I18nProvider>
        </HashRouter>
      </Provider>
    );
  }
}

export default hot(module)(Root);
