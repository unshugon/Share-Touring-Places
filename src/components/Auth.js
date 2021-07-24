import React from 'react';
import { Redirect } from 'react-router-dom';
import firebase from '../Firebase';
import { Spinner } from 'react-bootstrap';
import homeStyle from './view/home.module.scss';

class Auth extends React.Component {

    state = {
        signinCheck: false, //ログインチェックが完了してるか
        signedIn: false, //ログインしてるか
    }

    componentDidMount = () => {
        //ログインしてるかどうかチェック
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                //してる
                this.setState({
                    signinCheck: true,
                    signedIn: true,
                });
            } else {
                //してない
                this.setState({
                    signinCheck: true,
                    signedIn: false,
                });
            }
        })
    }

    render() {
        //チェックが終わってないなら（ローディング表示）
        if (!this.state.signinCheck) {
            return (
            <div>
                <span variant="primary" disabled className={homeStyle.loading}>
                    <Spinner
                    as="span"
                    animation="border"
                    role="status"
                    aria-hidden="true"
                    />
                    <span className={homeStyle.loadingLetter}>Loading...</span>
                </span>
            </div>
            );
        }

        //チェックが終わりかつ
        if (this.state.signedIn) {
            //サインインしてるとき（そのまま表示）
            return this.props.children;
        } else {
            //してないとき（ログイン画面にリダイレクト）
            return <Redirect to="/login" />
        }
    }
}

export default Auth;
