import {useState} from "react";
import {auth, db} from "../../firebase_config";
import {collection, getDocs} from "firebase/firestore";
import {getDownloadURL, getStorage, ref} from "firebase/storage";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {useNavigate} from "react-router";
import OtherRecipeFeed from "./othersRecipeFeed";

//Kan se siden på /seeProfile

function OthersProfilePage() {

    const usersCollectionRef = collection(db, "users")
    const [firstname, setFirstname] = useState("")
    const [lastName, setLastName] = useState("")
    const [bio, setBio] = useState("")
    const [imageURL, setImageURL] = useState("")
    const [currentUser, setCurrentUser] = useState({});

    //Denne setter til den nåværende brukeren, vi må sette den til brukeren vi vil se oppskriftene til

    onAuthStateChanged(auth, (currentUser) => {
        setCurrentUser(currentUser);
        loadUser();
    })


    const loadUser = async () => {
        const data = await getDocs(usersCollectionRef);
        const user = data.docs.filter(doc => doc.id === currentUser.uid).reduce((a, b) => a).data();
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
        const imageRef = ref(getStorage(), 'profilePictures/' + currentUser.uid + '.png');
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
            <h1>{firstname} {lastName} sine oppskrifter: </h1>
            <OtherRecipeFeed/>
        </div>
    )
}

export default OthersProfilePage;