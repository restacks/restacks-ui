const appConfig = require('../../../../config/main');
import * as React from 'react';
import * as Helmet from 'react-helmet';
import { Layout } from '../../components';
import { MuiThemeProvider } from 'material-ui/styles';
const injectTapEventPlugin = require('react-tap-event-plugin');
// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

class App extends React.Component<any, any> {
  public render() {
    const s = require('./style.css');

    return (
      <MuiThemeProvider>
        <section className={s.appContainer}>
          <Helmet {...appConfig.app} {...appConfig.app.head}/>
          <Layout title={appConfig.app.head.title}/>
          {this.props.children}
        </section>
      </MuiThemeProvider>
    );
  }
}

export { App }
