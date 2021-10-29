import spinnerStyle from './css/Spinner.module.css';
export function Spinner() {
  return (
    <div>
      <div className={spinnerStyle.spinner}>
        <div className={spinnerStyle.bounce1}></div>
        <div className={spinnerStyle.bounce2}></div>
        <div className={spinnerStyle.bounce3}></div>
      </div>
    </div>
  );
}
