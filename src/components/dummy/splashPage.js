import image1 from '../../images/forside-3.jpg'
import image2 from '../../images/forside-2.jpg'
import image3 from '../../images/logo.png'
import '../../css/app.scss'


function SplashPage() {
    return(
        <div id="splash">
            <img src={image3} style={{width:"50%"}}></img>
            <h3>
                <img className="dummyImage" src={image1} style={{width:"40%", height:"40%"}}></img>
                <img className="dummyImage" src={image2} style={{width:"40%", height:"40%"}}></img>
            </h3>
        </div>
    )
}

export default SplashPage;