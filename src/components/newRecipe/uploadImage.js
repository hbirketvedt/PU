import {getStorage, ref, uploadBytes} from "firebase/storage";
import {useState} from "react";
import "../../css/app.scss"
import {useNavigate} from "react-router";


function UploadImage() {
    const [image, setImage] = useState(null)
    // navigate is used to navigate between pages
    const navigate = useNavigate();

    /**
     * Stores uploaded photo in image variable
     */
    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    /**
     *
     * @param data Title and description props that are passed from newRecipe.js. Passed on to addIngredients.js
     * so they can be uploaded to database when recipeFeed is submitted.
     * @return {Promise<void>}
     */
    const submitData = async (data) => {
        const storage = getStorage();
        const storageRef = ref(storage, `/images/${image.name}`);
        uploadBytes(storageRef, image).then((snapshot) => {
            console.log('Uploaded a blob or file!');
        });
        navigate("/ingredients", {state: data})
    }

    return (
        <div className={"card"}>
            <input type={"file"} onChange={handleChange}>Upload Photo</input>
            <button onClick={submitData}>Next</button>
        </div>
    )
}

export default UploadImage