import React from 'react';
import {Authenticator, withAuthenticator} from 'aws-amplify-react';
import {Auth, Hub, Storage} from "aws-amplify";
import {Button, Grid} from 'semantic-ui-react'
import Webcam from '../Webcam'
import TopMenu from '../TopMenu'
import {isUserAdmin} from "../utils";
import bops from 'bops';
import {IMAGE_FORMAT} from "../conf";

const uuidv4 = require('uuid/v4');

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

    onPlay({capture}) {

        console.log(capture())
    }

    onSendToS3 = async ({capture, category}) => {

        try {
            const base64img = capture();
            const cleanBase64img = base64img.replace(/^data:image\/jpeg;base64,/, "");
            const blob = bops.from(cleanBase64img, "base64");
            const guid = uuidv4();
            const key = `${category}/${guid}`;

            const result = await Storage.put(key, blob, {
                level: 'private',
                contentType: IMAGE_FORMAT
            });

            console.log(result)

        } catch (e) {
            console.log(e);
        }
    };

    render() {

        const {user, userAttributes} = this.state;

        return (!user ?
                <Authenticator/> :
                <Grid container textAlign='center'>
                    <Grid.Column>

                            <TopMenu
                                userAttributes={userAttributes}
                                handleSignOut={this.handleSignOut}
                            />

                            <Webcam>
                                {(capture) => (<>

                                    <Button
                                        onClick={() => this.onPlay({capture})}
                                        size='huge'
                                        color='green'
                                    >Play</Button>

                                    {isUserAdmin({user}) && <Button.Group size='huge' color='blue'>
                                        <Button
                                            onClick={() => this.onSendToS3({capture, category: "rock"})}>Rock</Button>
                                        <Button.Or/>
                                        <Button
                                            onClick={() => this.onSendToS3({capture, category: "paper"})}>Paper</Button>
                                        <Button.Or/>
                                        <Button onClick={() => this.onSendToS3({
                                            capture,
                                            category: "scissors"
                                        })}>Scissors</Button>
                                    </Button.Group>}

                                </>)}
                            </Webcam>
                    </Grid.Column>

                    {/*Compatibility https://caniuse.com/#feat=stream*/}
                </Grid>

        );
    }
}

export default withAuthenticator(App, {
    signUpConfig: {
        hiddenDefaults: ['phone_number']
    }
});
