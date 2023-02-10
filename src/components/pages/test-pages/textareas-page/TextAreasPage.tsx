import TextArea, { TextAreaState, TextAreaSpecs} from "@/components/common/ui/text-area/TextArea";
import styles from "../test-pages.module.scss";

const TextAreasPage = () => (
    <div className={styles['test-page-wrap']}>
        <TextArea placeholder="Тиць..."/>
        <TextArea placeholder="Не тиць..." label="не тицькай"/>
        <TextArea placeholder="filler text" isDisabled={true}/>
        <TextArea placeholder="huge" sizing={TextAreaSpecs.LARGE}/>
        <TextArea placeholder="smoll" sizing={TextAreaSpecs.SMALL} label="srenck"/>
        <TextArea placeholder="" areaCurrState={TextAreaState.SUCCESS}/>
        <TextArea placeholder="" label="label" areaCurrState={TextAreaState.ERROR}/>
    </div>
);

export default TextAreasPage;
