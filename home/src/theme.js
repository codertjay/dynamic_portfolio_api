import React , { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import BaseRouter from './routes';
import * as actions from './store/actions/auth';
import NavbarPage from "./components/Navbar";
import Footer from "./components/Footer";
import { MuiThemeProvider , createMuiTheme , CssBaseline } from '@material-ui/core';
import Acme from './fonts/Acme-Regular.ttf'



const acme = {
    fontFamily: 'Acme' ,
    fontStyle: 'normal' ,
    fontDisplay: 'swap' ,
    fontWeight: 400 ,
    src: `
    local('Acme'),
    local('fonts/Acme-Regular.ttf'),
    url(${Acme}) format('ttf')
  ` ,
    unicodeRange:
        'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF' ,
};
const theme = createMuiTheme({
  typography: {
    fontFamily: 'Acme,  sans-serif',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [acme],
      },
    },
  },
});


class App extends Component {

    componentDidMount () {
        this.props.onTryAutoSignup ();
    }

    render () {
        return (
            <MuiThemeProvider theme={theme}>
                {/*<CssBaseline/>*/}

                {/*<Router>*/}
                {/*    <NavbarPage/>*/}
                {/*    <BaseRouter/>*/}
                {/*</Router>*/}
                {/*<Footer/>*/}

            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.token !== null ,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch (actions.authCheckState ())
    }
}

export default connect (mapStateToProps , mapDispatchToProps) (App);
