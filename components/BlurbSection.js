import { MDBAnimation, MDBContainer, MDBRow, MDBCol, MDBIcon } from "mdbreact";

const BlurbSection = () => {
    return (
        <MDBContainer
            style={{ height:"100vh", width: '100vw', paddingTop: '5em', backgroundColor: "#000"}}
        >
            <header>
                <div className="view">
                    <MDBRow>
                        <MDBCol className='text-center text-md-left mt-xl-5 mb-5'>
                            <MDBAnimation type='fadeInRight' delay='.3s'>
                                <h1 style={{color: "#fff", paddingTop:"0em"}} className='h1-responsive font-weight-bold mt-sm-5'>
                                    A trading card strategy game
                                </h1>
                                <p style={{color: "#fff"}}>
                                    We had seperated ourselves into castes, as clear as night and day. And now that magic has begun to dwindle these divisions have never been more defined. Will you fight for your Caste and bring glory to your house?
                                </p>
                            </MDBAnimation>
                        </MDBCol>

                        <MDBCol className='text-center'>
                            <MDBAnimation type='fadeInLeft' delay='.3s'>
                                <img className="rounded" src="./assets/image/cards/preview.png" height="450px"/>
                            </MDBAnimation>
                        </MDBCol>
                    </MDBRow>
                </div>
            </header>
        </MDBContainer>
    )
}

export default BlurbSection