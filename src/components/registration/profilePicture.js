import { getAuth, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage"
import { stringify } from "@firebase/util";
import Signup from "./signup";

function ProfilePicture() {

    //const currentUser = getAuth();
    const [ photoURL, setPhotoURL ] = useState("https://sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png");
    const storage = getStorage();
    const [ photo, setPhoto] = useState(null);
    const [refresh, setRefresh] = useState(false);

    const removePicture = async () => {
        const mail = Signup.registerEmail
        window.location.reload();
        console.log(mail)
    }

    const handleChange = (e) => {
        const etf = e.target.files[0]; 
        /**
         * Checks if etf is not null and a jp(e)g- or a png-file.
         */
        if (etf && (etf.name.includes(".jpeg") || etf.name.includes(".png") || etf.name.includes(".jpg"))) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const data = String(reader.result);
                setPhotoURL(data);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
        removePicture();
    }
    /*
    const upload = async (file, currentUser, setLoading) => {
        const fileRef = ref(storage, "profilePictures/" + currentUser.uid + ".png");

        setLoading(true);
        const snapshot = await uploadBytes(fileRef, file);
        setLoading(false);
    } */
    /*
    useEffect(() => {
        if (currentUser?.photoURL) {
            setPhotoURL(currentUser.photoURL);
        }
    }, [currentUser]); */

   

    return(
        <div >
            <p>Profilbilde:</p>
            <img src={photoURL} alt="Avatar" className="avatar" />
            <input type="file" onChange={handleChange} />
            <p/>
        </div>
    )
}

export default ProfilePicture;