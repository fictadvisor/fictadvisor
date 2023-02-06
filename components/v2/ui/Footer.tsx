import React, { ReactNode } from "react";
import styles from "styles/v2/local/components/Navigation.module.scss";
import Button, { ButtonIconPosition, ButtonSize, ButtonType } from "./Button";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
interface FooterProps {

}

const Footer: React.FC<FooterProps> = (props) => {
    return (
        <div className={styles["footer-container"]}>
            <div className={styles["footer-logo"]}>
                <img src={`/assets/logo.png`} alt="logo" />
            </div>
            <div className={styles["signature"]}>
                <p>By Dev відділ ср ФІОТ</p>
            </div>
            <div className={styles["main-references"]}>
                <div className={styles["title"]}>
                    <p>Основні посилання</p>
                </div>
                <Button text="Головна" onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                <Button text="Опитування" onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                <Button text="Викладачі" onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                <Button text="Предмети" onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                <Button text="Розклад" onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
            </div>
            <div className={styles["support"]}>
                <p className={styles["title"]}>
                    Підтримка
                </p>
                <Button text="Конфіденційність" onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                <Button text="FICT robot" onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
            </div>
            <div className={styles["social-media"]}>
                <p className={styles["title"]}>
                    Соціальне
                </p>
                <Button text="Git" icon={<AcademicCapIcon />} iconPosition={ButtonIconPosition.LEFT} onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                <Button text="Tertiary" icon={<AcademicCapIcon />} iconPosition={ButtonIconPosition.LEFT} onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
            </div>
        </div>
    )
}

export default Footer;




