import React, { useState } from 'react';
import './CreateList.css';
import * as FirestoreService from '../../services/firestore';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

function CreateList(props) {

    const { onCreate, userId } = props;

    const [ error, setError ] = useState();

    function createGroceryList(e) {
        e.preventDefault();
        setError(null);

        const userName = document.createListForm.userName.value;
        if (!userName) {
            setError('user-name-required');
            return;
        }

        /**
         * [[1,
         * {"__sm__":
         * {"status":
         * [[{"error":
         * {"code":403,"details":
         * [{"@type":"type.googleapis.com/google.rpc.Help",
         * "links":[{"description":"Google developers console API activation", "url":"https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=1062976637804"}]},
         * {"@type":"type.googleapis.com/google.rpc.ErrorInfo","domain":"googleapis.com",
         * "metadata":{"consumer":"projects/1062976637804","service":"firestore.googleapis.com"},
         * "reason":"SERVICE_DISABLED"}],
         * "message":"Cloud Firestore API has not been used in project 1062976637804 before or it is disabled. Enable it by visiting 
         * https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=1062976637804 then retry. If you enabled this API recently, wait a few minutes for the action to propagate to our systems and retry.","status":"PERMISSION_DENIED"}}]]}}],[2,["close"]]]
         */
        FirestoreService.createGroceryList(userName, userId)
            .then(docRef => {
                console.log('Got docref: ', docRef)
                onCreate(docRef.id, userName);
            })
            .catch(reason => setError('create-list-error'));
    }

    return (
        <div>
            <header>
                <h1>Welcome to the Grocery List app!</h1>
            </header>
            <div className="create-container">
                <div>
                    <form name="createListForm">
                        <p><label>What is your name?</label></p>
                        <p><input type="text" name="userName" /></p>
                        <ErrorMessage errorCode={error}></ErrorMessage>
                        <p><button onClick={createGroceryList}>Create a new grocery list</button></p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateList;