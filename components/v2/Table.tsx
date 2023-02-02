import React, { ReactNode } from "react";
import styles from "styles/v2/local/components/Table.module.scss";

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
                    <div className={styles["table-container"]}>
                        <div className={styles["user-container"]} style={{ gap: userGap }}>
                            <div className={styles["user-avatar"]}>
                                <img src={`/assets/${field.avatar}`} alt="avatar" />
                            </div>
                            <div className={styles["user-info"]}>
                                <div className={styles["full-name"]} style={{ width: userWidth }}>{field.fullName}</div>
                                {field.tag && <div className={styles["tag"]}>{field.tag}</div>}
                            </div>
                        </div>
                        <div className={styles["email"]}>{field.email}</div>
                        <div className={styles["editing"]}>{
                            field.tag
                                ? <div className={styles["checkbox"]}>{field.checkBox}</div>
                                : <div className={styles["first-button"]} style={{ width: "134px" }}>{field.firstButton}</div>
                        }
                            <div className={styles["second-button"]}>{field.secondButton}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Table;




