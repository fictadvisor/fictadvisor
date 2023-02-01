import {IconButtonSize, SortButton, SortButtonOrder, TrashBucketButton} from "../../../components/v2/ui/IconButton";
import styles from "styles/v2/local/pages/test.module.scss";

function IconButtons(){
    return(
        <div className = {styles["test-page-wrap"]}>
            <div className = {styles["test-page-content"]}>
                <SortButton size={IconButtonSize.LARGE} order={SortButtonOrder.ASCENDING}/>
                <SortButton size={IconButtonSize.LARGE} order={SortButtonOrder.DESCENDING}/>
                <SortButton size={IconButtonSize.NORMAL} order={SortButtonOrder.ASCENDING}/>
                <SortButton size={IconButtonSize.NORMAL} order={SortButtonOrder.DESCENDING}/>
                <SortButton size={IconButtonSize.LARGE} order={SortButtonOrder.ASCENDING} disabled={true}/>
                <SortButton size={IconButtonSize.LARGE} order={SortButtonOrder.DESCENDING} disabled={true}/>
                <SortButton size={IconButtonSize.NORMAL} order={SortButtonOrder.ASCENDING} disabled={true}/>
                <SortButton size={IconButtonSize.NORMAL} order={SortButtonOrder.DESCENDING} disabled={true}/>

                <TrashBucketButton size={IconButtonSize.LARGE}/>
                <TrashBucketButton size={IconButtonSize.NORMAL}/>
                <TrashBucketButton size={IconButtonSize.LARGE} disabled={true}/>
                <TrashBucketButton size={IconButtonSize.NORMAL} disabled={true}/>
            </div>
        </div>
    );
}

export default IconButtons;
