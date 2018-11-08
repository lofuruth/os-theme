import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import theme from './theme'
import {MuiThemeProvider} from '@material-ui/core'
import {history, store} from './store';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'react-router-redux';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>

            <MuiThemeProvider theme={theme}>
                <App/>
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
