import React, { ReactNode } from "react";
import styles from "styles/v2/local/components/Navigation.module.scss";
import Button, { ButtonSize, ButtonType } from "./Button";
import { HeaderCard } from "./Cards";
import Link from "next/link";
interface HeaderProps {
    buttons: {
        text: string,
    }[],
    isLoggined: boolean,
    username?: string,
    groupName?: string,
    position?: string,
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <div className={styles["header-container"]}>
            <div className={styles["header-logo"]}>
                <img src={`/assets/logo.png`} alt="logo" />
            </div>
            <div className={styles["menu"]}>
                {props.buttons.map(tertiary => {
                    return (
                        <Link href={{}}>
                            <Button text={tertiary.text} onClick={() => { }} isDisabled={false} size={ButtonSize.LARGE} type={ButtonType.TERTIARY} />
                        </Link>
                    )
                })}

            </div>

            <div>
                {!props.isLoggined && <div className={styles["auth-container"]}>
                    <div>
                        <Link href={{}}>
                            <Button text="Зареєструватись" onClick={() => { }} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.SECONDARY_RED} />
                        </Link>
                    </div>
                    <div>
                        <Link href={{}}>
                            <Button text="Увійти" onClick={() => { }} isDisabled={false} size={ButtonSize.SMALL} type={ButtonType.PRIMARY_RED} />
                        </Link>
                    </div>
                </div>
                }
                {props.isLoggined && <div className={styles["user-container"]}>
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(1,1fr)",
                            gap: "8px",
                        }}
                    >
                        <HeaderCard
                            name={props.username}
                            groupName={props.groupName}
                            position={props.position}
                        />{" "}
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

export default Header;




