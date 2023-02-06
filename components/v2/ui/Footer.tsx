import React, { ReactNode } from "react";
import styles from "styles/v2/local/components/Navigation.module.scss";
import Button, { ButtonIconPosition, ButtonSize, ButtonType } from "./Button";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { GitHubIcon } from "../custom-svg/GitHub";
import { CustomCheck } from "../custom-svg/CustomCheck";
import { InstagramIcon } from "../custom-svg/Instagram";
import { TelegramIcon } from "../custom-svg/Telegram";
interface FooterProps {

}

const Footer: React.FC<FooterProps> = (props) => {
    return (
        <div className={styles["footer-container"]}>
            <div>
                <div className={styles["footer-logo"]}>
                    <img src={`/assets/logo.png`} alt="logo" />
                </div>
                <div className={styles["signature"]}>
                    <p>By Dev відділ ср ФІОТ</p>
                </div>
            </div>
            <div className={styles["link-container"]}>
                <div className={styles["main-references"]}>
                    <div className={styles["title"]}>
                        <p>Основні посилання</p>
                    </div>
                    <Link href={{}}>
                        <Button text="Головна" onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                    </Link>
                    <Link href={{}}>
                        <Button text="Опитування" onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                    </Link>
                    <Link href={{}}>
                        <Button text="Викладачі" onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                    </Link>
                    <Link href={{}}>
                        <Button text="Предмети" onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                    </Link>
                    <Link href={{}}>
                        <Button text="Розклад" onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                    </Link>
                </div>
                <div className={styles["support"]}>
                    <div className={styles["title"]}>
                        <p>Підтримка</p>
                    </div>
                    <Link href={{}}>
                        <Button text="Конфіденційність" onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                    </Link>
                    <Link href={{}}>
                        <Button text="FICT robot" onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                    </Link>
                </div>

                <div className={styles["social-media"]}>
                    <div className={styles["title"]}>
                        <p>Соціальне</p>
                    </div>
                    <Link href={{}}>
                        <Button text="GitHub" icon={<GitHubIcon/>} iconPosition={ButtonIconPosition.LEFT} onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                    </Link>
                    <Link href={{}}>
                        <Button text="Instagram" icon={<InstagramIcon />} iconPosition={ButtonIconPosition.LEFT} onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                    </Link>
                    <Link href={{}}>
                        <Button text="Telegram" icon={<TelegramIcon />} iconPosition={ButtonIconPosition.LEFT} onClick={() => { }} isDisabled={false} size={ButtonSize.MEDIUM} type={ButtonType.TERTIARY} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;