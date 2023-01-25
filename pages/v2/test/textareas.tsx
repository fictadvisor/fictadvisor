import {TextArea, TextAreaState} from "../../components/v2/TextArea";

export default function textareas(){

    return(
        <div className='test-page-wrap'>
            <TextArea placeholder="Тиць..." />
            <TextArea placeholder="filler text" isDisabled={true} />
            <TextArea placeholder="huge" sizing="large"/>
            <TextArea placeholder="smoll" sizing="small" label="srenck"/>
            <TextArea placeholder="" areaCurrState={TextAreaState.SUCCESS}/>
            <TextArea placeholder="" label="label" areaCurrState={TextAreaState.ERROR}/>
        </div>
    )
}