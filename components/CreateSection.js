import { MDBAnimation, MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";

const CreateSection = () => {
    return (
        <MDBContainer
            style={{ height:"100vh", width: '100vw', paddingTop: '5em', backgroundColor: "#000"}}
        >
            <header>
                <div className="view">
                    <MDBRow>
                        <MDBCol className='text-center text-md-left mt-xl-5 mb-5'>
                            <MDBAnimation type='fadeInRight' delay='.3s'>
                                <img className="rounded" src="./assets/image/design.png" height="450px"/>
                            </MDBAnimation>
                        </MDBCol>

                        <MDBCol className='text-center'>
                            <MDBAnimation type='fadeInLeft' delay='.3s'>
                                <h1 style={{color: "#ffffff", paddingTop:"2em"}} className='h1-responsive font-weight-bold mt-sm-5'>
                                    Help build, design and share the world of kaisimi. Powered by opensource code, nft assets
                                    and community driven content. <br/>
                                    Join the <a style={{color:"#5865F2"}} href="https://discord.gg/FyWwUNXxy2">discord</a> to get started! 
                                </h1>
                            </MDBAnimation>
                        </MDBCol>
                    </MDBRow>
                </div>
            </header>
        </MDBContainer>
    )
}

export default CreateSection