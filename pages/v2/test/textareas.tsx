import {TextArea, TextAreaState, TextAreaSpecs} from "../../../components/v2/ui/TextArea";
import styles from "styles/v2/local/pages/test.module.scss";

export default function textareas(){
    return(
        <div className={styles['test-page-wrap']}>
            <TextArea placeholder="Тиць..." />
            <TextArea placeholder="Не тиць..." label="не тицькай"/>
            <TextArea placeholder="filler text" isDisabled={true} />
            <TextArea placeholder="huge" sizing={TextAreaSpecs.LARGE}/>
            <TextArea placeholder="smoll" sizing={TextAreaSpecs.SMALL} label="srenck"/>
            <TextArea placeholder="" areaCurrState={TextAreaState.SUCCESS}/>
            <TextArea placeholder="" label="label" areaCurrState={TextAreaState.ERROR}/>
        </div>
    )
}