import React from 'react';
import Webcam from "react-webcam";
import {Button, Image} from 'semantic-ui-react'
import Countdown from 'react-countdown-now';

class WebcamCapture extends React.Component {

    state = {
        imageSrc: null,
        date: Date.now(),
        countdownIsRunning: false
    };

    onPlay = () => {

        this.setState({
            date: Date.now() + 2000,
        }, () => {
            this.countdown.getApi().start();
        });
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
            imageSrc,
            countdownIsRunning: false
        });
    };

    render() {
        const videoConstraints = {
            facingMode: "user",
        };

        const {imageSrc, date, countdownIsRunning} = this.state;

        return (
            <>
                <Countdown
                    date={date}
                    ref={this.setCountdownRef}
                    onComplete={this.capture.bind(this)}
                    autoStart={false}
                    onStart={() => this.setState({countdownIsRunning: true})}
                />

                <Webcam
                    height="auto"
                    width="100%"
                    audio={false}
                    ref={this.setCameraRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
                <Button
                    onClick={this.onPlay}
                    loading={countdownIsRunning}
                    size='huge'
                    color='green'
                >Play</Button>

                <Image src={imageSrc} size='small'/>
            </>

        );
    }

}

export default WebcamCapture;