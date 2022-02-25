import { useState } from "react";
import { db } from "../../firebase_config";
import { collection, getDocs } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { auth } from "../../firebase_config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router";
import PersonalRecipeFeed from "./personalRecipeFeed";
import "./profilePage.scss"



function ProfilePage() {
    const usersCollectionRef = collection(db, "users")
    const [email, setEmail] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastName, setLastName] = useState("")
    const [bio, setBio] = useState("")
    const [imageURL, setImageURL] = useState("")

    const [currentUser, setCurrentUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setCurrentUser(currentUser);
        loadUser();
    })

    const logout = async () => {
        if (window.confirm("Er du sikker på at ønsker å logge ut?")) {
            await signOut(auth);
            goToLogin();
        }
    }

    const navigate = useNavigate();

    const goToLogin = async () => {
        navigate("../registration/login")
    }

    const goToEditProfile = async () => {
        navigate("/editProfile")
    }

    const loadUser = async () => {
        const data = await getDocs(usersCollectionRef);
        const user = data.docs.filter(doc => doc.id === currentUser.uid).reduce((a, b) => a).data();
        setEmail(user.email);
        setFirstname(user.firstName);
        setLastName(user.lastName);
        if (user.bio === "") {
            setBio("(Ingen bio)");
        } else {
            setBio(user.bio);
        }
        if (user.imageURL === user.uid) {
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
            <Card style={{ width: '19rem' }}>
                <Card.Img variant="top" src={imageURL} className="profileImage" />
                <Card.Body>
                    <Card.Text> <em>{bio}</em> </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>E-post: {email}</ListGroupItem>
                    <ListGroupItem>Fornavn: {firstname} </ListGroupItem>
                    <ListGroupItem>Etternavn: {lastName}</ListGroupItem>
                    <p></p> 
                </ListGroup>
            </Card>
            <div className="centerButtons">
                <button onClick={goToEditProfile}>
                    Endre profil
                </button>
                <button onClick={logout} type="signOut">
                    Logg ut
                </button>
            </div>
            <PersonalRecipeFeed/>
        </div>
    )
}

export default ProfilePage;