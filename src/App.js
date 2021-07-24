import React from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Auth from './components/Auth';

//view
import Home from './components/view/Home';
import Login from './components/view/Login';

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Auth>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route render={() => <p>not found.</p>} />
                        </Switch>
                    </Auth>
                </Switch>
            </Router>
        );
    }
}

export default App;
