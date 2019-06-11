import React from 'react';
import Webcam from "react-webcam";
import {Button, Image} from 'semantic-ui-react'
import Countdown from 'react-countdown-now';

class WebcamCapture extends React.Component {

    state = {
        imageSrc : null
    };

    onPlay = () => {
        this.countdown.getApi().start();
    };

    setCameraRef = webcam => {
        this.webcam = webcam;
    };

    setCountdownRef = countdown => {
        this.countdown = countdown;
    };

    capture = () => {
        const imageSrc = this.webcam.getScreenshot();

        this.setState({
            imageSrc
        });
    };

    render() {
        const videoConstraints = {
            width: 1280,
            height: 720,
            facingMode: "user"
        };

        const {imageSrc}= this.state;

        return (
            <>
                <Countdown
                    date={Date.now() + 3000}
                    ref={this.setCountdownRef}
                    onComplete={this.capture.bind(this)}
                    autoStart={false}
                />
                <Webcam
                    height={480}
                    width={640}
                    audio={false}
                    ref={this.setCameraRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
                <Button onClick={this.onPlay}>Play</Button>

                <Image src={imageSrc} size='small' />
            </>

        );
    }

}

export default WebcamCapture;