import Navbar from './Navbar';
import styles from '../styles/Layout.module.css';

const Layout = ({children}) => {
    return (
        <div
            style={{ backgroundColor: "#000"}}
        >
            <Navbar/>
            <main>
                {children}
            </main>
        </div>
    )
}

export default Layout