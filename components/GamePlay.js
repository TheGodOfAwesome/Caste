import React, { Component, useEffect, useState } from 'react';
import Head from 'next/head';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import axios from 'axios';
import moment from 'moment';
import { 
    MDBMask, MDBCard, MDBCardBody, MDBContainer, MDBRow, 
    MDBCol, MDBBtn, MDBModal, MDBModalBody, MDBIcon, MDBFooter 
} from 'mdbreact';
import Countdown from './Countdown';

export default function GamePlay() {
    const [modal, setModal] = useState(false);
    const [startEvent, setStartEvent] = useState(false);
    const [eventId, setEventId] = useState(false);
    const [enlargedCard, setEnlargedCard] = useState("");
    const [eventMetadata, setEventMetadata] = useState([]);
    const [eventVideo, setEventVideo] = useState("./assets/video/nebula.mp4");
    const [secsToEvent, setSecsToEvent] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [pass, setPass] = useState(false);
    let tomorrow  = new Date();
    let startsAt = new moment(tomorrow).format('MM DD YYYY, h:mm a');
    const [nextStartTime, setNextStartTime] = useState(startsAt);

    useEffect(() => {
        setInterval(() => {
        }, 1000);
        setInterval(() => { 
        }, 60000);
    }, [])

    function endStream() {
        console.log("video ended");
    }

    function enlargeCard(id) {
        setEnlargedCard(id);
        setModal(true);
    }

    return (
        <div>
            <header>
                <div className="view" style={{maxHeight:"100vh"}}>
                    <video onEnded={() => endStream()} className="video-fluid" playsInline="playsinline" autoPlay="autoplay" muted={true} loop="loop">
                        <source src={eventVideo} type="video/mp4"/>
                    </video>
                    <div className="mask flex-center ">
                    </div>
                    <MDBMask className="d-flex justify-content-center align-items-center">
                        <MDBContainer className="d-flex justify-content-center align-items-center">
                            {
                                (secsToEvent < 15)
                                ?
                                    <MDBContainer>
                                        <MDBRow>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("1")}} className="rounded" src="./assets/image/cards/1.png" height="200px"/>
                                            </MDBCol>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("2")}} className="rounded" src="./assets/image/cards/2.png" height="200px"/>
                                            </MDBCol>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("3")}} className="rounded" src="./assets/image/cards/3.png" height="200px"/>
                                            </MDBCol>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("4")}} className="rounded" src="./assets/image/cards/4.png" height="200px"/>
                                            </MDBCol>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("5")}} className="rounded" src="./assets/image/cards/5.png" height="200px"/>
                                            </MDBCol>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("flash_floods")}} className="rounded" src="./assets/image/cards/flash_floods.png" height="200px"/>
                                            </MDBCol>
                                        </MDBRow>
                                        <MDBRow>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("1")}} className="rounded" src="./assets/image/cards/1.png" height="200px"/>
                                            </MDBCol>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("2")}} className="rounded" src="./assets/image/cards/2.png" height="200px"/>
                                            </MDBCol>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("3")}} className="rounded" src="./assets/image/cards/3.png" height="200px"/>
                                            </MDBCol>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("4")}} className="rounded" src="./assets/image/cards/4.png" height="200px"/>
                                            </MDBCol>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("5")}} className="rounded" src="./assets/image/cards/card_placeholder.png" height="200px"/>
                                            </MDBCol>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("sirocco")}} className="rounded" src="./assets/image/cards/sirocco.png" height="200px"/>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>
                                :
                                    <Countdown timeTillDate={nextStartTime} timeFormat="MM DD YYYY, h:mm a"/>
                            }
                            { 
                                (secsToEvent < 15)
                                &&
                                <MDBCard style={{ position: "fixed", bottom: 5, backgroundColor:"transparent"}}>
                                    <MDBCardBody className='text-center text-white transparent' s>
                                        <MDBRow>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("1")}} className="rounded" src="./assets/image/cards/1.png" height="100px"/>
                                            </MDBCol>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("2")}} className="rounded" src="./assets/image/cards/2.png" height="100px"/>
                                            </MDBCol>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("3")}} className="rounded" src="./assets/image/cards/3.png" height="100px"/>
                                            </MDBCol>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("4")}} className="rounded" src="./assets/image/cards/4.png" height="100px"/>
                                            </MDBCol>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("5")}} className="rounded" src="./assets/image/cards/5.png" height="100px"/>
                                            </MDBCol>
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard("scorched_earth")}} className="rounded" src="./assets/image/cards/scorched_earth.png" height="100px"/>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            }
                        </MDBContainer>
                    </MDBMask>
                    
                    <MDBContainer>
                        <MDBModal isOpen={modal} toggle={() => {setModal()}} side position="top-right">
                            <MDBModalBody toggle={() => {setModal()}}  className="form" style={{backgroundColor:"transparent"}}>
                                <MDBContainer className="d-flex justify-content-center align-items-center">
                                    <img className="rounded" src={"./assets/image/cards/" + enlargedCard + ".png"} height="450px"/>
                                </MDBContainer>
                            </MDBModalBody>
                        </MDBModal>
                    </MDBContainer>
                </div>
            </header>
        </div>
    )
}