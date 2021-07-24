import React from 'react';
import firebase from '../../Firebase';
import { Button } from 'reactstrap';
import Send from './Send';
import Print from './Print';
import homeStyle from './home.module.scss';
import { Spinner } from 'react-bootstrap';

class Home extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            progress: false,
        }
    }

    handleLogout = () => {
        firebase.auth().signOut();
    }

    handleUpload = (tOrF) => {
        this.setState({ progress: tOrF });
    }

    render() {
        if(!this.state.progress){
            return (
                <div className={homeStyle.container}>
                    <h1 className={homeStyle.header}>
                        Share Touring Spot
                    </h1>
                    <Button onClick={this.handleLogout} className={homeStyle.logout}>ログアウト</Button>
                    <Send handleUpload={(tOrF) => { this.handleUpload(tOrF) }} hometState={this.state} />
                    <Print />
                </div>
            );
        }
        else {
            return (
                <div className={homeStyle.loadingContainer}>
                    <span variant="primary" disabled className={homeStyle.loading}>
                        <Spinner
                        as="span"
                        animation="border"
                        role="status"
                        aria-hidden="false"
                        />
                        <span className={homeStyle.loadingLetter}>Loading...</span>
                    </span>
                </div>
            );
        }
    }
}

export default Home;
