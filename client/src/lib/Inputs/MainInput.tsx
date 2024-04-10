import styles from "./Input.module.scss";

type PROPS = {
  placeholder: string,
  className?: string | string[],
  styles?: string | number | object,
  onChange?: any,
  onFocus?: any,
  onBlur?: any,
  onInput?: any,
  value: string,
};

function MainInput(props: PROPS) {
  return (
    <input
      {...props}
      className={[styles.inputMain, props.className].join(' ')}
      type="text"
    />
  );
}

export default MainInput;
