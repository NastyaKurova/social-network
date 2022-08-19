import {addMessageAction, updateMessageTextAction} from "../../State/reducers/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../common/hoc/withAuthRedirect";
import {compose} from "redux";


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
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs)

