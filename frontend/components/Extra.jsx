import styles from '../styles/modules/Extra.module.css'
import useExtra from '../lib/hooks/useExtra'

export default function Extra() {
    const { extra, isVisible } = useExtra();

    if (!isVisible) return null;

    if (isVisible) return (
        <aside className={styles.right}>
            {extra}
        </aside>
    );
}