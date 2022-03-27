import Table from 'react-bootstrap/Table'
import {db} from "../../firebase_config";
import {collection, getDocs} from "firebase/firestore";
import {auth} from "../../firebase_config";
import {useEffect, useRef, useState} from "react";
import {onAuthStateChanged} from "firebase/auth";
import React from 'react';
import { doc, deleteDoc } from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { useNavigate } from "react-router";



function Users() {

    const usersCollectionRef = collection(db, "users")
    const [currentUser, setCurrentUser] = useState({});
    const storage = getStorage();
    const navigate = useNavigate();

    const recipesCollectionRef = collection(db, "recipes");
    const [recipes, setRecipes] = useState([])
    const [allRecipes, setAllRecipes] = useState([])
    

    onAuthStateChanged(auth, (currentUser) => {
        setCurrentUser(currentUser);
    })
    

      useEffect(() => {
        getAllDataOnce();
        const loadRecipes = async () => {
            const data = await getDocs(recipesCollectionRef);
            const allRecipes = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
            setAllRecipes(allRecipes)
            setRecipes(allRecipes)
        };
        loadRecipes();
    }, []);



    var number = 0
    var tbody = document.getElementById("tbody1");

    const addItemsToTable = (email, firstName, lastName, id) => {
        let trow = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        let button = document.createElement("button");
        let userID = id; 
        
        td1.innerHTML = ++number;
        td2.innerHTML = email;
        td3.innerHTML = firstName;
        td4.innerHTML = lastName;
        button.append("Slett");

        button.onclick = function() {
            deleteUser1(email, firstName, lastName, userID);
        }

        td5.appendChild(button);
        
        trow.appendChild(td1);
        trow.appendChild(td2);
        trow.appendChild(td3);
        trow.appendChild(td4);
        trow.appendChild(td5)
        
        tbody = document.getElementById("tbody1");
        
        tbody.appendChild(trow);
    }  

    const addAllItemsToTable = async (users, ids) => { 
        let i = 0;
        users.forEach(element => {
            if (element.email !== "admin@gmail.com") {         
                addItemsToTable(element.email, element.firstName, element.lastName, ids[i]);
            } 
            i++;
        })
    }

    const getAllDataOnce = async () => { 
        var users = [];
        var ids = []
        let i = 0
        const data = await getDocs(usersCollectionRef).then((snapshot) => {
            snapshot.docs.forEach(childSnapshot => {
                users.push(childSnapshot.data())
                ids.push(childSnapshot.id);
            })
            addAllItemsToTable(users, ids);
        });
    }

    const goToUsers = async () => {
        navigate("/users")
    }

    const deleteUser1 = async (email, firstName, lastName, id) => {


        
        if (window.confirm("Er du sikker på at ønsker å slette brukeren? Denne handlingen kan ikke angres.")) {
    
            // Sletter bruker
            await deleteDoc(doc(db, "users", id));

            // Sletter profilbilde
            const imageRef = ref(storage, "profilePictures/" + id + ".png");
            deleteObject(imageRef).then(() => {
                    console.log("Profilbildet ble slettet!")
                }).catch((error) => {
                    console.log("Brukeren hadde ikke profilbilde")
                });

            // Sletter oppskrifter
            const data = await getDocs(recipesCollectionRef);
            const alle = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
            console.log(alle.length)
            for (let i = 0; i < alle.length; i++) {
                if (alle[i].userID === id) {
                    await deleteDoc(doc(db, "recipes", alle[i].id));
            } 
            window.location.reload();
          } 
            
        
        } 

    }


    return(
        <div >
            <p></p>
            <Table striped bordered hover style={{width:"75%", marginLeft:"12.5%"}}>
            <thead>
                <tr>
                    <th>#</th>
                    <th style={{width:"25%"}}>E-post</th>
                    <th style={{width:"25%"}}>Fornavn</th>
                    <th style={{width:"25%"}}>Etternavn</th>
                    <th style={{width:"12%"}}>Slett bruker</th>
                </tr>
            </thead>
            <tbody id="tbody1"></tbody>
            </Table>
        </div>
    )
}

export default Users;