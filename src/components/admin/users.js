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
import { deleteUser, getAuth } from "firebase/auth";
//const { initializeApp } = require('firebase-admin/app');


function Users() {

    const usersCollectionRef = collection(db, "users")
    const [currentUser, setCurrentUser] = useState({});
    const storage = getStorage();
    const navigate = useNavigate();
    

    onAuthStateChanged(auth, (currentUser) => {
        setCurrentUser(currentUser);
    })
    

      useEffect(() => {
        getAllDataOnce();
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
        console.log("hei")
        //const user = getAuth().getUserByEmail(email);
        //console.log(user.email);
        getAuth()
            .getUser(id)
            .then((userRecord) => {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log(`Successfully fetched user data:`);
            })
            .catch((error) => {
                console.log('Error fetching user data:', error);
            });

        /*
        if (window.confirm("Er du sikker på at ønsker å slette brukeren? Denne handlingen kan ikke angres.")) {
            await deleteDoc(doc(db, "users", id));
            const imageRef = ref(storage, "profilePictures/" + id + ".png");
            deleteObject(imageRef).then(() => {
                    console.log("Profilbildet ble slettet!")
                }).catch((error) => {
                    console.log("Brukeren hadde ikke profilbilde")
                });

            // Slette oppskrifter
            
            auth.deleteUser(id).then(() => {
                console.log("Sletting vellykket!")
              }).catch((error) => {
                console.log("Sletting mislykket!")
                console.log(error.message)
              });
            goToUsers();
        } */

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
                    <th style={{width:"15%"}}>Slett bruker</th>
                </tr>
            </thead>
            <tbody id="tbody1"></tbody>
            </Table>
        </div>
    )
}

export default Users;