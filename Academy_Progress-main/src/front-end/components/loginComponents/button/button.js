import './button.css'
export default function Button(props) {
   return( 
   <button id = {props.id} className={`btn ${props.className || ''}".trim()}`}>
    {props.children}
   </button> );
}