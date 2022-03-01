import image1 from '../../images/forside-3.jpg'
import image2 from '../../images/forside-2.jpg'
import '../../css/app.scss'


function SplashPage() {
    return(
        <div id="splash">
            <h1 style={{fontSize:"100px"}}>
                FOODIES
            </h1>
            <h3>
                "Oppskrifter lett tilgjengelig for deg"
            </h3>
            <h3>
                <img className="dummyImage" src={image1}></img>
                <img className="dummyImage" src={image2}></img>
            </h3>
        </div>
    )
}

export default SplashPage;