import {useState, useEffect} from "react";
import {db} from "../../firebase_config";
import {
    firebase, collection, getDocs, addDoc, updateDoc, doc, deleteDoc,
} from "firebase/firestore";
import Navbar from "../navbar/navbar";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";
import { auth } from "../../firebase_config";
import { onAuthStateChanged, signOut} from "firebase/auth";
import { useNavigate } from "react-router";



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
        await signOut(auth);
        goToLogin();
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
            setBio("Ingen bio");
        } else {
            setBio(user.bio);
        }
        handleDownload();
    }
    const handleDownload = async () => {
        const imageRef = ref(getStorage(), 'profilePictures/' + currentUser.uid + '.png');
        getDownloadURL(imageRef)
            .then((url) => {
                setImageURL(url)
            })
            .catch((error) => {
                console.log(error.message)
                switch (error.code) {
                    case 'storage/object-not-found':
                        // File doesn't exist
                        break;
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;
                    case 'storage/unknown':
                        // Unknown error occurred, inspect the server response
                        break;
                    }
            });
        }


    /*
    useEffect(() => {
        const loadUser = async () => {
            const data = await getDocs(usersCollectionRef);
            const user = data.docs.filter(doc => doc.id === currentUser.uid).reduce((a, b) => a).data()
            //setUsername(user.username)
            //setPhonenumber(user.telephone)
            setEmail(user.email);
            setFirstname(user.firstName)
            console.log(user.firstName)
            console.log("Heisa")
            setSurname(user.lastName)
            //setAge(user.age)
            setBio(user.bio)
            setImageURL(user.profilePictureURL)
            console.log(user.email)
            getDownloadURL(starsRef)
                    .then((url) => {
                        setImageURL(url)
                    })
                    .catch((error) => {
                        console.log("Miss!")
                        switch (error.code) {
                            case 'storage/object-not-found':
                                // File doesn't exist
                                break;
                            case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;
                            case 'storage/canceled':
                                // User canceled the upload
                                break;

                            // ...

                            case 'storage/unknown':
                                // Unknown error occurred, inspect the server response
                                break;
                        }
                    });
        };
        loadUser();
        console.log("Database Polled");
    }, []); */
    
    return (
        <div>
            <Card style={{ width: '19rem' }}>
                <Card.Img variant="top" src={imageURL} className="profileImage" />
                <Card.Body>
                    <Card.Text> {bio} </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>E-post: {email}</ListGroupItem>
                    <ListGroupItem>Fornavn: {firstname} {lastName}</ListGroupItem>
                    <ListGroupItem>Etternavn: {lastName}</ListGroupItem>
                    <p></p> 
                </ListGroup>
            </Card>
            <button onClick={goToEditProfile}>
                Endre profil
            </button>
            <button onClick={logout} type="signOut">
                Logg ut
            </button>
            
        </div>
    )
}

export default ProfilePage;