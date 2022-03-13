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
import { 
    useMoralis, useMoralisFile, useMoralisWeb3ApiCall, useMoralisWeb3Api, useWeb3ExecuteFunction 
} from "react-moralis";
import { abi } from "../contracts/caste_abi.json";
import LoadingSpinner from "./LoadingSpinner";
import Countdown from './Countdown';
import Sound from './Sound';

export default function CreateCard() {
    const [modal, setModal] = useState(false);
    const [modal1, setModal1] = useState(false);
    const [loading, setLoading] = useState(false);
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
    const [imageHash, setImageHash] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const placeHolder = "./assets/image/cards/card_placeholder.png";

    const chain = "Mumbai";
    // const {image, title, date, interested, going} = props;
    const { authenticate, isAuthenticated, enableWeb3, user, Moralis } = useMoralis();
    const Web3Api = useMoralisWeb3Api();

    const { fetch } = useWeb3ExecuteFunction();
    const { saveFile } = useMoralisFile();
    const nft_contract_address = "0x39fb37AA56d771cB720aF170250f67D1e1a77a68"; 

    const {
        fetch: nftFetch,
        data: nftData,
        error: nftError,
        isLoading: nftLoading,
    } = useMoralisWeb3ApiCall(Web3Api.account.getNFTs, {
        chain: chain,
    });
    const [userState, setUserState] = useState(null);

    useEffect(() => {
        //call API every 50 seconds
        const interval = setInterval(() => {
            if (user) {
                setUserState(user);
                nftFetch();
            } else {
                authenticate({signingMessage:"Caste Sign In"});
            }
        }, 5000);
        //clear the interval
        console.log(user, "USER");
        return () => clearInterval(interval);
    }, [user]);

    async function walletConn() {
        await authenticate({signingMessage:"Caste Sign In"});
        enableWeb3();
        try{
            let addr = user.get('ethAddress');
            console.log("User Address: " + addr);
        } catch(e) { 
            console.error(e);
        }
    }

    // after token mint
    const setInteractionData = async (_response) => {
        // confirm token was minted; that total circulation increased
        console.log("RESPONSE POST-MINT:", _response);
        // resetAll(true);
    };

    // mintToken(tokenURI);
    const mintToken = async (tokenURI) => {
        const options = {
            abi: abi,
            contractAddress: nft_contract_address,
            functionName: "safeMint",
            to: user.get('ethAddress'),
            uri: tokenURI,
            params: {
                to: user.get('ethAddress'),
                uri: tokenURI,
                tokenURI: tokenURI,
            },
        };

        console.log("Options: ", options);

        await fetch({
            params: options,
            onSuccess: (response) => {setInteractionData(response); console.log("MINT COMPLETE"); setLoading(false); setModal(!modal); setModal1(!modal1)},
            onComplete: () => {console.log("MINT COMPLETE"); setLoading(false); setModal(!modal)},
            onError: (error) => {console.log("ERROR", error); setLoading(false); setModal(!modal)},
        });
    };

    async function mint() {
        setLoading(true);
        if(!isAuthenticated){
            await walletConn();
        }
        enableWeb3();
        const name = "Card";
        const description = "New Card";
        const royalties = 10 * 100;
        const imageHashString = imageHash;
    
        let metadata = {
            name: name,
            description: description,
            image: "/ipfs/" + imageHashString,
            image_url: imageUrl
        }
    
        const jsonFile = await saveFile(
            "metadata.json", 
            {base64 : btoa(JSON.stringify(metadata))}, 
            { saveIPFS: true }
        );
    
        const metadataHash = jsonFile._hash;
    
        const tokenURI = 'ipfs://' + metadataHash;
        console.log("TokenURI: ", tokenURI);
        mintToken(tokenURI);
    }
    

    const displayNFTBalancesTable = (NFTData) => {
        return (
            <div className='text-white'>
                <table className="table">
                    <thead>
                        <tr>
                        <th>NFT Name</th>
                        <th>Token Address</th>
                        <th>Token ID</th>
                        <th>Contract Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {NFTData.length !== 0 ? (
                        NFTData.result.map((element, i) => {
                            return (
                            <React.Fragment key={i}>
                                <tr>
                                    <td>{element.name}</td>
                                    <td>{element.token_address}</td>
                                    <td style={{ lineBreak: "anywhere" }}>{element.token_id}</td>
                                    <td>{element.contract_type}</td>
                                </tr>
                            </React.Fragment>
                            );
                        })
                        ) : (
                        <tr>
                            <td></td>
                            <td>No NFTs</td>
                            <td></td>
                        </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    };

    function getImageLink(nftMetadata) {
        return (nftMetadata.image_url == "" || nftMetadata.image_url == undefined) ?  "./assets/image/cards/card_placeholder.png": nftMetadata.image_url;
    }

    const displayNFTs = (NFTData) => {
        let count = 6;
        const rowArray = ["1", "2", "3", "4", "5", "6"];
        return (
            <MDBContainer>
                <MDBRow>
                    {
                        NFTData.result.length > 0
                        &&  
                        (
                            NFTData.result.map((element, i) => {
                                if (element.name == "Caste") {
                                    const nft_metadata = JSON.parse(element.metadata);
                                    console.log(nft_metadata);
                                    const image_link = getImageLink(nft_metadata);
                                    console.log(image_link);
                                    if(image_link !== "./assets/image/cards/card_placeholder.png") {
                                        count--;
                                        return (
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard(image_link)}} className="rounded" src={image_link} height="200px"/>
                                            </MDBCol>
                                        )
                                    } else {
                                        return (
                                            <MDBCol>
                                                <img onClick={()=>{enlargeCard(image_link)}} className="rounded" src={image_link} height="200px"/>
                                            </MDBCol>
                                        )
                                    }
                                }
                            })
                        )
                    }
                    {
                        // rowArray.forEach(element => {
                        //     if(element <= count){
                        //         console.log(count);
                        //         console.log(element);
                        //         return(
                        //             <React.Fragment key={element}>
                        //                 <MDBCol>
                        //                     <img onClick={()=>{enlargeCard(placeHolder)}} className="rounded" src={placeHolder} height="200px"/>
                        //                 </MDBCol>
                        //             </React.Fragment>
                        //         )
                        //     }
                        // })
                    }
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <img onClick={()=>{enlargeCard(placeHolder)}} className="rounded" src={placeHolder} height="200px"/>
                    </MDBCol>
                    <MDBCol>
                        <img onClick={()=>{enlargeCard(placeHolder)}} className="rounded" src={placeHolder} height="200px"/>
                    </MDBCol>
                    <MDBCol>
                        <img onClick={()=>{enlargeCard(placeHolder)}} className="rounded" src={placeHolder} height="200px"/>
                    </MDBCol>
                    <MDBCol>
                        <img onClick={()=>{enlargeCard(placeHolder)}} className="rounded" src={placeHolder} height="200px"/>
                    </MDBCol>
                    <MDBCol>
                        <img onClick={()=>{enlargeCard(placeHolder)}} className="rounded" src={placeHolder} height="200px"/>
                    </MDBCol>
                    <MDBCol>
                        <img onClick={()=>{enlargeCard(placeHolder)}} className="rounded" src={placeHolder} height="200px"/>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }

    function handleFiles(files) {
        console.log("handleFiles");
        console.log(files);
        for (let i = 0; i < files.length; i++) {
            console.log(files[i]);
            uploadFile(files[i]);
        }
    }

    async function uploadFile(file) {
        if (file && file.name) {
            let fileIpfs = await saveFile(file.name, file, { saveIPFS: true });
            console.log(fileIpfs);
            const _url = fileIpfs._url;
            const _name = fileIpfs._name;
            const _ipfs = fileIpfs._ipfs;
            const _hash = fileIpfs._hash;
            setImageHash(_hash);
            setImageUrl(_ipfs);
            console.log(imageHash);
            console.log(_ipfs);
        }
    }

    function endStream() {
        console.log("video ended");
    }

    function enlargeCard(id) {
        setEnlargedCard(id);
        setModal(true);
    }

    // const result = nftData.result.concat([{}]);
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
                            <MDBContainer>
                                {
                                    nftData !== null 
                                        ? displayNFTs(nftData) 
                                        // ? displayNFTBalancesTable(nftData)
                                        : 
                                            <div className="d-flex justify-content-center align-items-center">
                                                <LoadingSpinner/>
                                            </div>
                                }
                            </MDBContainer>
                                
                            <MDBCard style={{ position: "fixed", bottom: 5, backgroundColor:"transparent"}}>
                                <MDBCardBody className='text-center text-white' s>
                                    <div
                                        style={{
                                            // backgroundColor: "transparent",
                                            borderColor: "#ffffff !important", 
                                            borderWidth:"2px !important", 
                                            height:"100px",
                                            width:"1000px"
                                        }}
                                    >
                                        <h1 onClick={() => { mint() }}>
                                            Create Card +
                                        </h1>
                                        <div className="">
                                            <div className="">
                                                {/* <div className={styles.file-select-button} id="fileName">Choose File</div>
                                                <div className={styles.file-select-name} id="noFile">No file chosen...</div>  */}
                                                <input 
                                                    className="" 
                                                    onChange={(e) => handleFiles(e.target.files)}  
                                                    style={{width:"400px"}}
                                                    type="file" 
                                                    name="chooseFile" 
                                                    id="chooseFile"  
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBContainer>
                    </MDBMask>
                    
                    <MDBContainer>
                        <MDBModal isOpen={modal} toggle={() => {setModal()}} side position="top-right">
                            <MDBModalBody style={{backgroundColor: "#000"}} toggle={() => {setModal()}}  className="form">
                                <MDBContainer className="d-flex justify-content-center align-items-center">
                                    <img className="rounded" src={enlargedCard} height="450px"/>
                                </MDBContainer>
                            </MDBModalBody>
                        </MDBModal>
                    </MDBContainer>

                    <MDBModal isOpen={modal1} toggle={() => { setModal1(!modal1) }} centered size="sm" >
                        <MDBModalBody style={{backgroundColor:"#000", border:"none"}} toggle={() => {setModal1(!modal1)}}  className="form black">
                            <MDBContainer className="form">
                                <MDBRow>
                                    <MDBCol md="12">
                                        <p className="h5 text-center mb-4 text-white"> 
                                            You have minted your new Card!
                                        </p>
                                    </MDBCol>
                                
                                    <button style={{ backgroundColor: "#00ffa1", width: "100%" }} type="button" className="btn btn-dark" onClick={() => { setModal1(!modal1) }} hover>Close</button>
                                    <br/>
                                </MDBRow>
                            </MDBContainer>
                        </MDBModalBody>
                    </MDBModal>
                </div>
            </header>
        </div>
    )
}