import React ,{Component}from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,browserHistory } from 'react-router';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
class App extends Component{
    render(){
        return (
            <div>
                <h1>App</h1>
                <ul>
                    {/*<li><Link to="/about">About</Link></li>*/}
                    {/*<li><Link to="/inbox">Inbox</Link></li>*/}
                </ul>
                {this.props.children}
            </div>
        )
    }
}



class About extends Component{
    render(){
        return <h3>About</h3>
    }
}

class Inbox extends Component{
    render(){
        return (
            <div>
                <h2>Inbox</h2>
                {this.props.children || "Welcome to your Inbox"}
            </div>
        )
    }
}

class Message extends Component{
    render(){
        return <h3>
            {/*Message {this.props.params.id}*/}
        </h3>
    }
}
ReactDOM.render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <Route path="about" component={About} />
            <Route path="inbox" component={Inbox}>
                {/*<Route path="messages/:id" component={Message} />*/}
            </Route>
        </Route>
    </Router>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
