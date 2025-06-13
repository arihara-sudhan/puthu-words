import barImg from "./assets/leftbar-img.png";
import styles from './LeftBar.module.css';

export default function LeftBar() {
    return (
        <div className={styles.leftbar}>
            <div className={styles.textdiv}>
                <h1>PUTHU VAARTHAI</h1>
                <p>This is a page where you can learn New English Words at no cost! I send daily messages to my contacts at WhatsApp which I have used here as data...</p>
            </div>
            <img src={barImg} onClick={()=>{
                window.open("https://arihara-sudhan.github.io", "_blank");
            }} alt="Left Bar Img"/>
        </div>
    )
}