import React from 'react';
import Webcam from "react-webcam";
import {IMAGE_FORMAT} from "../conf";

class WebcamCapture extends React.Component {

    setCameraRef = webcam => {
        this.webcam = webcam;
    };

    capture = () => {
        return this.webcam.getScreenshot()
    };

    render() {

        const videoConstraints = {
            facingMode: "user",
        };

        return (
            <>
                <Webcam
                    height="auto"
                    width="100%"
                    audio={false}
                    ref={this.setCameraRef}
                    screenshotFormat={IMAGE_FORMAT}
                    videoConstraints={videoConstraints}
                />

                {this.props.children(this.capture.bind(this))}

            </>);
    }
}

export default WebcamCapture;