import {useState} from "react";
import {auth, db} from "../../firebase_config";
import {collection, doc, getDocs} from "firebase/firestore";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
//import {onAuthStateChanged, signOut} from "firebase/auth";
import {useNavigate} from "react-router";
import OtherRecipeFeed from "./othersRecipeFeed";
import { useLocation } from "react-router";
import { useEffect } from "react";


//Kan se siden på /seeProfile

function OthersProfilePage() {

    const usersCollectionRef = collection(db, "users")
    const [firstname, setFirstname] = useState("")
    const [lastName, setLastName] = useState("")
    const [bio, setBio] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [currentUser, setCurrentUser] = useState({});
    const {state} = useLocation()
    const [recipe, setRecipe] = useState([])
    const [otherUser, setOtherUser] = useState({});

    
    //Denne setter til den nåværende brukeren, vi må sette den til brukeren vi vil se oppskriftene til


    useEffect(() => {
        setRecipe([state])
        //setOtherUser(state.userID)
        setOtherUser(state.userID)
        console.log(state)
        console.log(otherUser)
        //console.log(state.uid)
        loadUser();
    }, [])


    /*const userFromRecipe = () => {
        console.log(state.recipe)
        console.log("hei")
        const uid = recipe.uid
        const user = doc(db, "users", uid)
        setCurrentUser(user);
        loadUser();
    } */
 


    const loadUser = async () => {
        const data = await getDocs(usersCollectionRef);
        const user = data.docs.filter(doc => doc.id === state.userID).reduce((a, b) => a).data();
        console.log(user)
        setFirstname(user.firstName);
        setLastName(user.lastName);
        if (user.bio === "") {
            setBio("(Ingen bio)");
        } else {
            setBio(user.bio);
        }
        if (user.profilePictureURL === currentUser.uid) {
            handleDownloadImage();
        } else {
            handleDownloadDefault();
        }

    }

    const handleDownloadImage = async () => {
        const imageRef = ref(getStorage(), 'profilePictures/' + otherUser.uid + '.png');
        getDownloadURL(imageRef)
            .then((url) => {
                setImageURL(url)
            })
            .catch((error) => {
                console.log(error.message)
            });
    }

    const handleDownloadDefault = async () => {
        const imageRef = ref(getStorage(), 'profilePictures/' + "default.png");
        getDownloadURL(imageRef)
            .then((url) => {
                setImageURL(url)
            })
            .catch((error) => {
                console.log(error.message)
            });
    }


    return (
        <div>
            <div className="centerButtons">
                <Card style={{width: '19rem', marginTop: '4em'}}>
                    <Card.Img variant="top" src={imageURL} className="profileImage"/>
                    <Card.Body>
                        <Card.Text> <em>{bio}</em> </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Fornavn: {firstname} </ListGroupItem>
                        <ListGroupItem>Etternavn: {lastName}</ListGroupItem>
                    </ListGroup>
                </Card>
                </div>
                <div style={{marginTop:"3em", marginBottom:"2em", textAlign:"center"}}>
                    <h2>Oppskrifter</h2>
                    <hr style={{height:"1px", color:"black", backgroundColor:"black", width:"70%", marginLeft:"15%"}}/>
                </div>
            <OtherRecipeFeed />
        </div>
    )
}

export default OthersProfilePage;