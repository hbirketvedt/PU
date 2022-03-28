import { useState, useEffect } from "react";
import {collection, getDocs} from "firebase/firestore";
import {auth, db} from "../../firebase_config";
import {Card, Button} from "react-bootstrap";
import CommentFormName from "./commentFormName";



function CommentForm(props) {

    const commentCollectionRef = collection(db, "comment");
    const usersCollectionRef = collection(db, "users");

    const [ id ] = useState(props.id) 
    const [ content, setContent ] = useState("")
    const [ userID, setUserID] = useState("");
    const [ firstName, setFirstName] = useState("");
    const [ lastName, setLastName] = useState("");


    useEffect(() => {
        loadComment()
        loadName()
    }, [])

    const loadComment = async () => {
        const data = await getDocs(commentCollectionRef);
        try {
            const d = data.docs.filter(doc => doc.id === id).reduce(a => a).data();
            setContent(d.content)
            setUserID(d.userID)
        } catch (error) {
            console.log(error)
        }
    }

    const loadName = async () => {
        const data = await getDocs(usersCollectionRef);
        try {
            console.log(userID)
            const d = data.docs.filter(doc => doc.id === userID).reduce(a => a).data();
            setFirstName(d.firstName)
            setLastName(d.lastName)
        } catch (error) {
            console.log(error)
        }
    }



    return(
        <div>
            <Card style={{width:"40%", marginLeft:"30%", marginTop:"1em", marginBottom:"2em", borderBlockWidth:"0.01em"}}>
                <Card.Header style={{textAlign:"left"}}>
                    <CommentFormName id={userID}/>
                </Card.Header>
                <Card.Body style={{textAlign:"left"}}>
                    <Card.Text>
                        {content} 
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
export default CommentForm;
