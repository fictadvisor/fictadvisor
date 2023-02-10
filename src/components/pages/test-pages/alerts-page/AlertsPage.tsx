import AlertBlock, {AlertBlockColor, AlertBlockSize, AlertBlockStyle} from "@/components/common/ui/alert-block/AlertBlock";
import React from "react";
import styles from "../test-pages.module.scss";

const AlertsPage = () => (
    <div className={styles["test-page-wrap"]}>
        <div className={styles["test-page-content"]}>
            {[AlertBlockStyle.OUTLINED, AlertBlockStyle.SECONDARY, AlertBlockStyle.PRIMARY, AlertBlockStyle.BORDER_LEFT, AlertBlockStyle.BORDER_TOP].map((style: AlertBlockStyle) =>
                <>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.SMALL}
                                color={AlertBlockColor.BLUE}/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.SMALL}
                                color={AlertBlockColor.BLUE}
                                description="We are happy to announce that we are going live on July 28th. Get ready!"/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.MEDIUM}
                                color={AlertBlockColor.BLUE}/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.MEDIUM}
                                color={AlertBlockColor.BLUE}
                                description="We are happy to announce that we are going live on July 28th. Get ready!"/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.LARGE}
                                color={AlertBlockColor.BLUE}/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.LARGE}
                                color={AlertBlockColor.BLUE}
                                description="We are happy to announce that we are going live on July 28th. Get ready!"/>

                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.SMALL}
                                color={AlertBlockColor.RED}/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.SMALL}
                                color={AlertBlockColor.RED}
                                description="We are happy to announce that we are going live on July 28th. Get ready!"/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.MEDIUM}
                                color={AlertBlockColor.RED}/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.MEDIUM}
                                color={AlertBlockColor.RED}
                                description="We are happy to announce that we are going live on July 28th. Get ready!"/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.LARGE}
                                color={AlertBlockColor.RED}/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.LARGE}
                                color={AlertBlockColor.RED}
                                description="We are happy to announce that we are going live on July 28th. Get ready!"/>

                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.SMALL}
                                color={AlertBlockColor.ORANGE}/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.SMALL}
                                color={AlertBlockColor.ORANGE}
                                description="We are happy to announce that we are going live on July 28th. Get ready!"/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.MEDIUM}
                                color={AlertBlockColor.ORANGE}/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.MEDIUM}
                                color={AlertBlockColor.ORANGE}
                                description="We are happy to announce that we are going live on July 28th. Get ready!"/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.LARGE}
                                color={AlertBlockColor.ORANGE}/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.LARGE}
                                color={AlertBlockColor.ORANGE}
                                description="We are happy to announce that we are going live on July 28th. Get ready!"/>

                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.SMALL}
                                color={AlertBlockColor.GREEN}/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.SMALL}
                                color={AlertBlockColor.GREEN}
                                description="We are happy to announce that we are going live on July 28th. Get ready!"/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.MEDIUM}
                                color={AlertBlockColor.GREEN}/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.MEDIUM}
                                color={AlertBlockColor.GREEN}
                                description="We are happy to announce that we are going live on July 28th. Get ready!"/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.LARGE}
                                color={AlertBlockColor.GREEN}/>
                    <AlertBlock title="We are going live in July!" style={style} size={AlertBlockSize.LARGE}
                                color={AlertBlockColor.GREEN}
                                description="We are happy to announce that we are going live on July 28th. Get ready!"/>
                </>)}
        </div>
    </div>
);

export default AlertsPage;
