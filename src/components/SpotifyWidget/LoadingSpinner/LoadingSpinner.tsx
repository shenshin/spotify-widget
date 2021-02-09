import style from './LoadingSpinner.module.scss';

const LoadingSpinner = (): JSX.Element => (
  <div className={style['lds-spinner']}>
    {[...Array(12).keys()].map((key: number) => (
      <div key={key} />
    ))}
  </div>
);

export default LoadingSpinner;
