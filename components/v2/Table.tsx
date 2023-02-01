import React, { ReactNode } from "react";

interface TableProps {
    fields: {
        fullName: string,
        email: string,
        avatar?: string,
        tag?: ReactNode,
        checkBox?: ReactNode,
        firstButton?: ReactNode,
        secondButton?: ReactNode,
    }[],
}

const Table: React.FC<TableProps> = (props) => {
    return (
        <div>
            {props.fields.map(field => {
                field.avatar = field.avatar ? field.avatar : "default-avatar.jpg";
                let userGap = (field.firstButton || field.checkBox || field.secondButton) ? "12px" : "26px";
                let userWidth = field.tag && (field.firstButton || field.checkBox || field.secondButton) ? "180px" : "304px";
                if (field.tag && !field.firstButton && !field.checkBox && !field.secondButton) userWidth = "288px";
                return (
                    <div className="table-container">
                        <div className="user-container" style={{ gap: userGap }}>
                            <div className="user-avatar">
                                <img src={`/assets/${field.avatar}`} alt="avatar" />
                            </div>
                            <div className="user-info">
                                <div className="full-name" style={{ width: userWidth }}>{field.fullName}</div>
                                {field.tag && <div className="tag">{field.tag}</div>}
                            </div>
                        </div>
                        <div className="email">{field.email}</div>
                        <div className="editing">{
                            field.tag
                                ? <div className="checkbox">{field.checkBox}</div>
                                : <div className="first-button" style={{ width: "134px" }}>{field.firstButton}</div>
                        }
                            <div className="second-button"  style={{ width: "fit-content" }}>{field.secondButton}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Table;




