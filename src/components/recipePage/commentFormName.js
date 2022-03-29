import { useState, useEffect } from "react";
import {collection, getDocs} from "firebase/firestore";
import {auth, db} from "../../firebase_config";
import {Card, Button} from "react-bootstrap";



function CommentFormName(props) {

    const usersCollectionRef = collection(db, "users");

    const [ firstName, setFirstName] = useState("");
    const [ lastName, setLastName] = useState("");


    useEffect(() => {
        const loadName = async () => {
        const data = await getDocs(usersCollectionRef);
        try {
            const d = data.docs.filter(doc => doc.id === props.id).reduce(a => a).data();
            setFirstName(d.firstName)
            setLastName(d.lastName)
        } catch (error) {
            console.log(error)
        }
    }
        loadName().then(console.log("name loaded"))

    }, [props.id, usersCollectionRef])



    return(
        <div>
            <Card.Title> {firstName} {lastName}</Card.Title>
        </div>
    )
}
export default CommentFormName;
