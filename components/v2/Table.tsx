import React, { ReactNode } from "react";

interface TableProps {
    fullName: string,
    email: string,
    avatarIcon?: ReactNode,
    tag?: ReactNode,
    checkBox?: ReactNode,
    button?: ReactNode,
    editIcon?: ReactNode,
    editButton?: ReactNode,
}

const Table: React.FC<TableProps> = (props) => {

    return (
        <div className="table-container">
            <div className="user-container">
                <div className="user-avatar"></div>
                <div className="user-info">
                    <div className="full-name">{props.fullName}</div>
                    <div className="tag">{props.tag ? props.tag : ""}</div>
                </div>
            </div>
            <div className="email">{props.email}</div>
            {props.checkBox ? props.checkBox : ""}
            <div style={{width:"fit-content"}}>{props.editButton}</div>
            {props.editIcon ? props.editIcon : ""}</div>
    )
}

export default Table;




