import React from 'react';
import { withRouter } from 'react-router-dom'
import firebase, {providerTwitter} from '../../Firebase';
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoginStyle from './login.module.scss';
import homeStyle from './home.module.scss';
import { Spinner } from 'react-bootstrap';


class Login extends React.Component {

    state = {
        loading: false, //spinner制御用
    }

    handleOnSubmitT = (values) => {
        //spinner表示開始
        this.setState({ loading: true })
        //サインイン（ログイン）処理
        firebase.auth().signInWithRedirect(providerTwitter)
        .then(res => {
            //正常終了時
            this.props.history.push("/");
            this.setState({ loading: false });
        })
        .catch(error => {
            //異常終了時
            this.setState({ loading: false });
            alert(error);
        });

    }

    handleOnSubmitA = (values) => {
        //spinner表示開始
        this.setState({ loading: true })
        //サインイン（ログイン）処理
        firebase.auth().signInAnonymously()
        .then(res => {
            //正常終了時
            this.props.history.push("/");
            this.setState({ loading: false });
        })
        .catch(error => {
            //異常終了時
            this.setState({ loading: false });
            alert(error);
        });

    }

    render() {
        if (this.state.loading) {
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
        else {
            return (
                <div className={LoginStyle.container}>
                    <div className={LoginStyle.wrapper}>
                        <h1 className={LoginStyle.header}>Share Touring Spot</h1>
                        <button onClick={this.handleOnSubmitT} id = "loginTwitter" className={LoginStyle.twitter}><FontAwesomeIcon icon={faTwitter} /> Login with Twitter</button>
                        <button onClick={this.handleOnSubmitA} className={LoginStyle.anonymous}>匿名ログイン</button>
                    </div>
                </div>
            );
        }
    }
}

export default withRouter(Login);
