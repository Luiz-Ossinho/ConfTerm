import useExtra from '../lib/hooks/useExtra'
import styles from '../styles/modules/Main.module.css'

export default function Main({children}) {
    const { isVisible } = useExtra();
    const widthStyle = isVisible ? { width: "50%" } : { width: "75%" };
    const borderStyle = isVisible ? { borderRight: "2px solid #ebebeb" } : {  };

    return <main className={styles.content} style={{...widthStyle,...borderStyle}}>
        {children}
    </main>;
}