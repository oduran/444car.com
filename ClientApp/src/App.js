import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
    <div className="pt-3 text-center">
        <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Home = React.lazy(() => import('./views/pages/home/Home'));
const Calculate = React.lazy(() => import('./views/pages/Calculate/Calculate'));
const ResetPassword = React.lazy(() => import('./views/pages/ResetPassword/ResetPassword'));
const PublishAd = React.lazy(() => import('./views/pages/PublishAd/PublishAd'));


//const Newad = React.lazy(() => import('./views/pages/newad/newad'));

const Contact = React.lazy(() => import('./views/pages/Contact/Contact'));
const FAQ = React.lazy(() => import('./views/pages/FAQ/FAQ'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const ForgotPassword = React.lazy(() => import('./views/pages/ForgotPassword/ForgotPassword'));
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

    render() {
        return (
            <HashRouter>
                <React.Suspense fallback={loading}>
                    <Switch>
                        <Route exact path="/" name="Home Page" render={props => <Home {...props} />} />
                        <Route exact path="/PublishAd" name="New Ad" render={props => <PublishAd {...props} />} />
                        <Route exact path="/Calculate" name="Home Page" render={props => <Calculate {...props} />} />
                        {/* <Route exact path="/PublishAd" name="Home Page" render={props => <PublishAd {...props} />} /> */}
                        <Route exact path="/Login" name="Login" render={props => <Login{...props} />} />
                        <Route exact path="/Register" name="Register" render={props => <Register{...props} />} />
                        <Route exact path="/ForgotPassword" name="ForgotPassword" render={props => <ForgotPassword{...props} />} />
                        <Route exact path="/FAQ" name="Home Page" render={props => <FAQ {...props} />} />
                        <Route  path="/ResetPassword" name="Home Page" render={props => <ResetPassword {...props} />} />
                        <Route exact path="/Contact" name="Contact Page" render={props => <Contact {...props} />} />
                        <Route exact path="/404" name="Page 404" render={props => <Page404 {...props} />} />
                        <Route exact path="/500" name="Page 500" render={props => <Page500 {...props} />} />
                        <Route path="/dashboard" name="Dashboard" render={props => <TheLayout {...props} />} />
                    </Switch>
                </React.Suspense>
            </HashRouter>
        );
    }
}

export default App;
