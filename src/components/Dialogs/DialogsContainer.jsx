import {addMessageAction} from "../../State/reducers/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../common/hoc/withAuthRedirect";
import {compose} from "redux";
import {getDialogsData, getMessagesData} from "../../State/selectors/dialogSelectors";


const mapStateToProps = (state) => {
    return ({
        dialogsData: getDialogsData(state),
        messagesData: getMessagesData(state)
    })
}
const mapDispatchToProps = (dispatch) => {
    return ({
        addMessage: (data) => dispatch(addMessageAction(data)),
    })
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs)

