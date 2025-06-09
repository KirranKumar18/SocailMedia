import './HomePage.css'
import { supabase } from './Supabase.js'

export default function HomePage(){

const MsgSender = async(Sender,Message,msg_Time)=>{

const { error } = await supabase
                .from("Chat")
                .insert([{Sender,Message,msg_Time}]);
                if(error){
                    alert("there was an error "+error)
                }
                else{
                    alert("No error")
                }
            }


    return(
        <>
        <div className="parent">

            <div className="left"> 

                <h1>left</h1>
                <button className='Hp-btn'>New Chat</button>
            </div>

            <div className='main-holder'>

            <div className="top"> 

                    <h1>NIGGAS IN PRESIDENCY</h1>
            </div>
            <hr/>

            <div className="main"> 
                    <h1>body</h1>

            </div>


            </div>
        </div>
        </>
    )
}