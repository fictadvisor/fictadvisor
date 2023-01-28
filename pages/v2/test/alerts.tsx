import { AlertBlock } from "../../../components/v2/AlertBlock";

function Alert() {
  return (
    <div className="test-page-wrap">
    
    {["outlined","secondary","primary","border-left","border-top"].map((style:"outlined" | "secondary" | "primary" | "border-left" | "border-top")=>
        <>
        <AlertBlock title="We are going live in July!" style={style} size='small' color="blue"/>
        <AlertBlock title="We are going live in July!" style={style} size='small' color="blue" description="We are happy to announce that we are going live on July 28th. Get ready!"/>
        <AlertBlock title="We are going live in July!" style={style} size='middle' color="blue"/>
        <AlertBlock title="We are going live in July!" style={style} size='middle' color="blue" description="We are happy to announce that we are going live on July 28th. Get ready!"/>
        <AlertBlock title="We are going live in July!" style={style} size='large' color="blue"/>
        <AlertBlock title="We are going live in July!" style={style} size='large' color="blue" description="We are happy to announce that we are going live on July 28th. Get ready!"/>

        <AlertBlock title="We are going live in July!" style={style} size='small' color="red"/>
        <AlertBlock title="We are going live in July!" style={style} size='small' color="red" description="We are happy to announce that we are going live on July 28th. Get ready!"/>
        <AlertBlock title="We are going live in July!" style={style} size='middle' color="red"/>
        <AlertBlock title="We are going live in July!" style={style} size='middle' color="red" description="We are happy to announce that we are going live on July 28th. Get ready!"/>
        <AlertBlock title="We are going live in July!" style={style} size='large' color="red"/>
        <AlertBlock title="We are going live in July!" style={style} size='large' color="red" description="We are happy to announce that we are going live on July 28th. Get ready!"/>

        <AlertBlock title="We are going live in July!" style={style} size='small' color="orange"/>
        <AlertBlock title="We are going live in July!" style={style} size='small' color="orange" description="We are happy to announce that we are going live on July 28th. Get ready!"/>
        <AlertBlock title="We are going live in July!" style={style} size='middle' color="orange"/>
        <AlertBlock title="We are going live in July!" style={style} size='middle' color="orange" description="We are happy to announce that we are going live on July 28th. Get ready!"/>
        <AlertBlock title="We are going live in July!" style={style} size='large' color="orange"/>
        <AlertBlock title="We are going live in July!" style={style} size='large' color="orange" description="We are happy to announce that we are going live on July 28th. Get ready!"/>

        <AlertBlock title="We are going live in July!" style={style} size='small' color="green"/>
        <AlertBlock title="We are going live in July!" style={style} size='small' color="green" description="We are happy to announce that we are going live on July 28th. Get ready!"/>
        <AlertBlock title="We are going live in July!" style={style} size='middle' color="green"/>
        <AlertBlock title="We are going live in July!" style={style} size='middle' color="green" description="We are happy to announce that we are going live on July 28th. Get ready!"/>
        <AlertBlock title="We are going live in July!" style={style} size='large' color="green"/>
        <AlertBlock title="We are going live in July!" style={style} size='large' color="green" description="We are happy to announce that we are going live on July 28th. Get ready!"/>
        </>
        
        
        
        
        
        
        
        
        
        
        )}
    </div>
    
  );
}

export default Alert;
