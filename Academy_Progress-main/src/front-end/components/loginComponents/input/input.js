import './input.css';
export default function Input(props) {
  return (
    <>
      <input
        onChange={props.onChange}
        id={props.id}
        className={`inputField ${props.className || ''}`.trim()}
        type={props.type}
        placeholder={props.placeholder}
      ></input>
    </>
  );
}
