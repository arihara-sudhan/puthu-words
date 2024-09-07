import React, { useState } from 'react';
import Vocab from '../Vocab';
import style from "./RightBar.module.css";
import meta from './meta.json';

export default function RightBar() {
    const [letter, setLetter] = useState("");
    
    return (
        <div className={style.parent}>
            {!letter ? (
                <div className={style.rightbar}>
                    {meta.map((rec, index) => {
                        const imgSrc = require(`./assets/${rec.imgPath}`);
                        return (
                            <div key={index} onClick={() => setLetter(`${rec.imgPath.split(".")[0]}`)}>
                                <img src={imgSrc} alt="LETTER"/>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <Vocab letter={letter}/>
            )}
        </div>
    );
}
