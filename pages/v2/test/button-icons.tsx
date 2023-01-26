import {ButtonIconSize, SortButton, SortButtonOrder, TrashBucketButton} from "../../../components/v2/ButtonIcon";

function ButtonIcons(){
    return(
        <div className="test-page-wrap">
            <SortButton size={ButtonIconSize.LARGE} order={SortButtonOrder.ASCENDING}/>
            <SortButton size={ButtonIconSize.LARGE} order={SortButtonOrder.DESCENDING}/>
            <SortButton size={ButtonIconSize.NORMAL} order={SortButtonOrder.ASCENDING}/>
            <SortButton size={ButtonIconSize.NORMAL} order={SortButtonOrder.DESCENDING}/>
            <SortButton size={ButtonIconSize.LARGE} order={SortButtonOrder.ASCENDING} disabled={true}/>
            <SortButton size={ButtonIconSize.LARGE} order={SortButtonOrder.DESCENDING} disabled={true}/>
            <SortButton size={ButtonIconSize.NORMAL} order={SortButtonOrder.ASCENDING} disabled={true}/>
            <SortButton size={ButtonIconSize.NORMAL} order={SortButtonOrder.DESCENDING} disabled={true}/>

            <TrashBucketButton size={ButtonIconSize.LARGE}/>
            <TrashBucketButton size={ButtonIconSize.NORMAL}/>
            <TrashBucketButton size={ButtonIconSize.LARGE} disabled={true}/>
            <TrashBucketButton size={ButtonIconSize.NORMAL} disabled={true}/>
        </div>
    );
}

export default ButtonIcons;
