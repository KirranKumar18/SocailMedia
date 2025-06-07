import { useNavigate } from 'react-router-dom'
import './DashBoard.css';
import Authentication from './Authentication'



export default function Dashboard(){
   
    const navigate=useNavigate();
   
    return(
        <>
        <div className="container">
                <p className="Header"> THE TITLE OF MY CHATPLAN</p>
            <div className='welMsg'>
                <p style={{fontSize:25}}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit placeat quae, ipsum nam iste voluptas voluptate corporis doloribus porro repellendus cum sunt asperiores, modi illo quos recusandae culpa aperiam hic nisi pariatur. Odit, sunt exercitationem aspernatur deleniti nihil praesentium magni hic inventore voluptatem quaerat laudantium ipsa voluptatibus possimus minus voluptate.</p>
                
                <button onClick={()=>{navigate('/Auth')}}> Sign Up</button>

            </div>
        </div>
        </>
    )
}