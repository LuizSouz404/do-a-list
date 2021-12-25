import Lottie from 'react-lottie';
import animationData from '../../lottie/loading.json';
import styles from './styles.module.scss';

export function Loading() {
  const defaultOptions = {
    loop:true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  }

  return (
    <div className={styles.container}>
      <Lottie options={defaultOptions} height={300} width={300} />
      <strong>Carregando...</strong>
    </div>
  )
}
