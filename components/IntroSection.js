import { MDBAnimation, MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";

const IntroSection = () => {
    return (
        <MDBContainer
            style={{ height:"100vh", width: '100vw', paddingTop: '5em', backgroundColor: "#000"}}
        >
            <header>
                <div className="view">
                    <MDBRow>
                        <MDBCol className='text-center text-md-left mt-xl-5 mb-5'>
                            <MDBAnimation type='fadeInRight' delay='.3s'>
                                <img className="rounded" src="./assets/image/logo_caste_square.png" height="450px"/>
                            </MDBAnimation>
                        </MDBCol>

                        <MDBCol className='text-center'>
                            <MDBAnimation type='fadeInLeft' delay='.3s'>
                                {/* <h1 style={{color: "#680de4", paddingTop:"4em"}} className='h1-responsive font-weight-bold mt-sm-5'>
                                    Lore a project onboarding interactive experience built on Polygon.
                                </h1> */}
                                <img className="rounded" src="./assets/image/cards/card_fan.png" height="450px"/>

                            </MDBAnimation>
                        </MDBCol>
                    </MDBRow>
                </div>
            </header>
        </MDBContainer>
    )
}

export default IntroSection