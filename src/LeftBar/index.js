import barImg from "./assets/leftbar-img.png";
import styles from './LeftBar.module.css';

export default function LeftBar() {
    return (
        <div className={styles.leftbar}>
            <div className={styles.textdiv}>
                <h1>Puthu Vaarthaigal</h1>
                <p>என் நெஞ்சிற்கினிய தமிழ் உறவுகளே... இந்த தளத்தில், புதிய ஆங்கில வார்த்தைகளை கற்கலாம்... தினமும், என் புலன தொடர்புகளுக்கு நான் அனுப்பும் குறுஞ்செய்திகளே இத்தளத்தின் தரவுகள்... This is a page where you can learn New English Words at no cost! I send daily messages to my contacts at WhatsApp which I have used here as data...</p>
            </div>
            <img src={barImg} alt="Left Bar Img"/>
        </div>
    )
}