import React from "react";
import {connect} from "react-redux";
import { signIn, signOut } from "../actions";

class GoogleAuth extends React.Component {
    componentDidMount() {
        window.gapi.load("client:auth2", () => {
            window.gapi.client.init({
                clientId: '769501477438-qe75g48om71e9230fc1gn42srsj6em4l.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                const userId = this.auth.currentUser.get().getBasicProfile() === undefined ? null : this.auth.currentUser.get().getBasicProfile().getId();
                //const userId = this.auth.currentUser.get().getBasicProfile().getId();
                this.onAuthChange(this.auth.isSignedIn.get(), userId);
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignIn, userId) => {
        if(isSignIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignIn = () => {
        this.auth.signIn(this.props.userId);
    }

    onSignOut = () => {
        this.auth.signOut();
    }

    renderAuthButton = () => {
        if(this.props.isSignedIn === null){
            return null;
        } else if(this.props.isSignedIn){
            return (
                <button onClick={this.onSignOut} className="ui red google button">
                    <i className="google icon"/>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignIn} className="ui red google button">
                    <i className="google icon"/>
                    Sign In With Google
                </button>
            );
        }
    }

    render() {
        return (
            <div>{this.renderAuthButton()}</div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);
