import style from './LoadingSpinner.module.scss';

const LoadingSpinner = () => (
  <div className={style['lds-spinner']}>
    {[...Array(12).keys()].map((key) => (
      <div key={key} />
    ))}
  </div>
);

export default LoadingSpinner;
