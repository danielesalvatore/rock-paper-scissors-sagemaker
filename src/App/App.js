import React from 'react';
import {Authenticator, withAuthenticator} from 'aws-amplify-react';
import {Auth, Hub} from "aws-amplify";
import {Container, Grid} from 'semantic-ui-react'
import Webcam from '../Webcam'
import TopMenu from '../TopMenu'

class App extends React.Component {

    state = {
        user: null,
        userAttributes: null
    };

    onHubCapsule = data => {

        switch (data) {
            case "signIn":
                console.log('signed in');
                this.getUserData();
                break;
            case "signUp":
                console.log('signed up');
                break;
            case "signOut":
                console.log('signed out');
                this.setState({user: null});
                break;
            default:
                return;
        }
    };

    handleSignOut = async () => {
        try {
            await Auth.signOut();
        } catch (e) {
            console.error(e)
        }

    };

    getUserAttributes = async authUserData => {
        const attributesArr = await Auth.userAttributes(authUserData);
        const attributesObj = Auth.attributesToObject(attributesArr);
        this.setState({userAttributes: attributesObj});
    };

    getUserData = async () => {
        const user = await Auth.currentAuthenticatedUser();
        !!user ? this.setState({user}, () => this.getUserAttributes(this.state.user)) : this.setState({user: null});
    };

    componentDidMount() {
        this.getUserData();

        Hub.listen("auth", this.onHubCapsule.bind(this));
    }

    render() {

        const {user, userAttributes} = this.state;

        return (!user ?
                <Authenticator/> :
                <Grid>
                    <Grid.Column>
                        <Container>

                            <TopMenu
                                userAttributes={userAttributes}
                                handleSignOut={this.handleSignOut}
                            />

                            <Webcam/>

                        </Container>
                    </Grid.Column>
                </Grid>

        );
    }
}

export default withAuthenticator(App, {
    signUpConfig: {
        hiddenDefaults: ['phone_number']
    }
})
;
