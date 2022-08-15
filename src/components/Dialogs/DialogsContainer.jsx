import {addMessageAction, updateMessageTextAction} from "../../State/reducers/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";


const mapStateToProps = (state) => {
    return ({
        dialogsData: state.dialogPage.dialogsData,
        messagesData: state.dialogPage.messagesData,
        newMessageText: state.dialogPage.newMessageText,
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({
        addMessage: () => dispatch(addMessageAction()),
        onMessageChange: (text) => {
            return dispatch(updateMessageTextAction(text))
        }
    })
}
const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);
export default DialogsContainer;