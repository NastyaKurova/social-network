import React from 'react';
import {actions} from "../../State/reducers/dialogsReducer";
import {Dialogs} from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../common/hoc/withAuthRedirect";
import {compose} from "redux";
import {getDialogsData, getMessagesData} from "../../State/selectors/dialogSelectors";
import {AppStateType} from "../../State/reduxStore";
import {DialogsDataType, MessagesDataType} from "../../types/types";

type MapStateToPropsType = {
    dialogsData: DialogsDataType[],
    messagesData: MessagesDataType[]
}
type MapDispatchToPropsType = {
    addMessage: (data: { dialogsText: string }) => void
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return ({
        dialogsData: getDialogsData(state),
        messagesData: getMessagesData(state)
    })
}
const mapDispatchToProps = (dispatch): MapDispatchToPropsType => {
    return ({
        addMessage: (data) => dispatch(actions.addMessage(data)),
    })
}
export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, mapDispatchToProps),
    withAuthRedirect,
)(Dialogs)

