import React from 'react';
import {addMessageAction, updateMessageTextAction} from "../../State/reducers/dialogsReducer";
import {Dialogs} from "./Dialogs";


export const DialogsContainer = ({store}) => {
    const state = store.getState()
    const addMessage = () => {
        return store.dispatch(addMessageAction())
    }
    const onMessageChange = (text) => {
        return store.dispatch(updateMessageTextAction(text))
    }
    return (
        <Dialogs dialogsData={state.dialogPage.dialogsData} messagesData={state.dialogPage.messagesData}
                 newMessageText={state.dialogPage.newMessageText} addMessage={addMessage}
                 onMessageChange={onMessageChange}/>
    );
};
