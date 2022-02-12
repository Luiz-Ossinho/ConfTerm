import styles from '../styles/modules/Layout.module.css'
import Navigator from './Navigator';
import Extra from './Extra';
import Main from './Main'

export default function Layout({ children }) {

    return (
        <div className={styles.container} >
            <Navigator />

            <Main>
                {children}
            </Main>
            
            <Extra />
        </div>
    );
};
