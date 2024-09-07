import React, { useState } from 'react';
import Vocab from '../Vocab';
import style from "./RightBar.module.css";
import meta from './meta.json';

export default function RightBar() {
    const [letter, setLetter] = useState("");
    const aToz = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const takeMeBack = ()=>{
        setLetter("");
    }
    return (
        <div className={style.rightbar_parent}>
            {!letter ? (
                <div className={style.rightbar}>
                    {meta.map((rec, index) => {
                        return (
                            <div key={index} onClick={() => setLetter(`${rec.imgPath.split(".")[0]}`)}>
                                <h1>{aToz[index]}</h1>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <Vocab letter={letter} backCallback={takeMeBack}/>
            )}
        </div>
    );
}
