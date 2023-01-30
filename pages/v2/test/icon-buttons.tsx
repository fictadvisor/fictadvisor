import {IconButtonSize, SortButton, SortButtonOrder, TrashBucketButton} from "../../../components/v2/IconButton";

function IconButtons(){
    return(
        <div className="test-page-wrap">
            <div className="test-page-content">
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
