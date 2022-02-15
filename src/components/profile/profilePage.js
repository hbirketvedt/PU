import {useState, useEffect} from "react";
import {db} from "../../firebase_config";
import {
    firebase, collection, getDocs, addDoc, updateDoc, doc, deleteDoc,
} from "firebase/firestore";
import Navbar from "../navbar/navbar";


function ProfilePage() {
    const documentID = "ajnqrGlobUEoQcuofgfR"
    const usersCollectionRef = collection(db, "users")
    const [surname, setSurname] = useState()

    const [tableData, settableData] = useState({
        username: "",
        telephone: ""
    });

    useEffect(() => {
        const loadUser = async () => {
            const data = await getDocs(usersCollectionRef);
            const user = data.docs.filter(doc => doc.id === documentID).reduce((a, b) => a).data()
            setSurname(user.username)
            console.log(user.username)
        };
        loadUser();
        console.log("Database Polled");
    }, []);
    
    return (
        <div className={"card"}>
            <h1>Brukerprofil</h1>
            <h3>Brukernavn:</h3>
            <h3>{surname}</h3>
            <h3>Telefonnummer: user.telephone </h3>
        </div>
    )
}

export default ProfilePage;