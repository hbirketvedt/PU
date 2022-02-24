import Textarea from 'react-textarea-autosize';
import {useForm, Controller} from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router";
import { auth } from "../../firebase_config";
import { onAuthStateChanged } from "firebase/auth";
import {db} from "../../firebase_config";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";


function ChangeBio() {

    const usersCollectionRef = collection(db, "users")
    const {register} = useForm()
    const [oldBio, setOldBio] = useState("")
    const [newBio, setNewBio] = useState("")
    const [user, setUser] = useState({});

    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        loadUser();
    })

    const loadUser = async () => {
        const data = await getDocs(usersCollectionRef);
        const dataFields = data.docs.filter(doc => doc.id === user.uid).reduce((a, b) => a).data();
        if (dataFields.bio === "") {
            setOldBio("(Ingen bio)");
        } else {
            setOldBio(dataFields.bio);
        }
    }

    const updateBio = async () => {
        const washingtonRef = doc(db, "users", user.uid);
        await updateDoc(washingtonRef, {
            bio: newBio
          });
        goToProfilePage();
    }

    const navigate = useNavigate();

    const goToProfilePage = async () => {
        navigate("/profilePage")
    }

    return(
        <div className={"card"}>
            <h4 className={"input__label"}>Nåværedne bio: </h4>
            <p className='bioHeader'><em>{oldBio}</em></p>
            <h4 className={"input__label"}>Ny bio: </h4>
            <Textarea
                onChange={(event) => {setNewBio(event.target.value)}}
                type={"textarea"}
                className={"input__field__big"}/>
            <div className="centerObject"> 
                <h1></h1>
                <button type="cancel" onClick={goToProfilePage}>Avbryt</button>
                <button type="save" onClick={updateBio}>Bekreft endringer</button>
            </div>
            <p></p>
        </div>
    )
}

export default ChangeBio;