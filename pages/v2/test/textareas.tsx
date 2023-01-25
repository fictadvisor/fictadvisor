import {TextArea, TextAreaState, TextAreaSpecs} from "../../../components/v2/TextArea";

export default function textareas(){
    return(
        <div className='test-page-wrap'>
            <TextArea placeholder="Тиць..." />
            <TextArea placeholder="Не тиць..." label="не тицькай"/>
            <TextArea placeholder="filler text" isDisabled={true} />
            <TextArea placeholder="huge" sizing={TextAreaSpecs.BIG}/>
            <TextArea placeholder="smoll" sizing={TextAreaSpecs.SMALL} label="srenck"/>
            <TextArea placeholder="" areaCurrState={TextAreaState.SUCCESS}/>
            <TextArea placeholder="" label="label" areaCurrState={TextAreaState.ERROR}/>
        </div>
    )
}