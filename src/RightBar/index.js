import React, { useEffect, useRef, useState } from 'react';
import Vocab from '../Vocab';
import style from "./RightBar.module.css";

export default function RightBar() {
    const [letter, setLetter] = useState("");
    const [meta, setMeta] = useState([]);
    const [filteredMeta, setFilteredMeta] = useState([]);
    const [hoveredLetter, setHoveredLetter] = useState("");
    const cache = useRef({});
    const aToz = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    useEffect(() => {
        const loadMeta = async () => {
            if (cache.current[hoveredLetter]) {
                setMeta(cache.current[hoveredLetter]);
                setFilteredMeta(cache.current[hoveredLetter]);
            } else {
                try {
                    const metaModule = await import(`../meta/${hoveredLetter}.json`);
                    cache.current[hoveredLetter] = metaModule.default;
                    setMeta(metaModule.default);
                    setFilteredMeta(metaModule.default);
                } catch (err) {
                    console.error("Error loading meta file:", err);
                }
            }
        };

        if (hoveredLetter) {
            loadMeta();
        }
    }, [hoveredLetter]);

    const takeMeBack = () => {
        setLetter("");
        setHoveredLetter(""); 
    };

    return (
        <div className={style.rightbar_parent}>
            {!letter ? (
                <div className={style.rightbar}>
                    {aToz.map((currentLetter) => (
                        <div
                            key={currentLetter}
                            onMouseEnter={() => setHoveredLetter(currentLetter)}
                            onClick={() => setLetter(currentLetter)}
                        >
                            <h1>{currentLetter}</h1>
                        </div>
                    ))}
                </div>
            ) : (
                <Vocab letter={letter} backCallback={takeMeBack} />
            )}
        </div>
    );
}
