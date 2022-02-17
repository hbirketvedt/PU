import {useState, useEffect} from "react";
import {db} from "../../firebase_config";
import {
    firebase, collection, getDocs, addDoc, updateDoc, doc, deleteDoc,
} from "firebase/firestore";
import Navbar from "../navbar/navbar";
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {Card, ListGroup, ListGroupItem} from "react-bootstrap";


function ProfilePage() {
    const documentID = "ajnqrGlobUEoQcuofgfR"
    const imageurl = "profilepic.jpg"
    const usersCollectionRef = collection(db, "users")
    const [username, setUsername] = useState()
    const [phonenumber, setPhonenumber] = useState()
    const [firstname, setFirstname] = useState()
    const [surname, setSurname] = useState()
    const [age, setAge] = useState()
    const [bio, setBio] = useState()
    const [url, setUrl] = useState("")
    const starsRef = ref(getStorage(), `profilePictures/${imageurl}`);

    useEffect(() => {
        const loadUser = async () => {
            const data = await getDocs(usersCollectionRef);
            const user = data.docs.filter(doc => doc.id === documentID).reduce((a, b) => a).data()
            setUsername(user.username)
            setPhonenumber(user.telephone)
            setFirstname(user.firstname)
            setSurname(user.surname)
            setAge(user.age)
            setBio(user.bio)
            console.log(user.username)
            getDownloadURL(starsRef)
                    .then((url) => {
                        setUrl(url)
                    })
                    .catch((error) => {
                        // A full list of error codes is available at
                        // https://firebase.google.com/docs/storage/web/handle-errors
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
    }, []);
    
    return (
        <div>
            <Card style={{ width: '19rem' }}>
                <Card.Img variant="top" src={url} height="300px" width="300px" />
                <Card.Body>
                    <Card.Text>
                        {bio}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroupItem>Brukernavn: {username}</ListGroupItem>
                    <ListGroupItem>Telefonnummer: {phonenumber}</ListGroupItem>
                    <ListGroupItem>Fornavn: {firstname}</ListGroupItem>
                    <ListGroupItem>Etternavn: {surname}</ListGroupItem>
                    <ListGroupItem>Alder: {age}</ListGroupItem>
                </ListGroup>
            </Card>
           {/*<img
                src={url}
                alt={""}
                className={"profilePic"}
          />*/}
           </div>
    )
}

export default ProfilePage;