import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from "./Vocab.module.css";
import speaker from "./assets/speaker.png";

export default function Vocab({ letter }) {
    const [meta, setMeta] = useState(null);
    const [filteredMeta, setFilteredMeta] = useState(null);
    const [expandedIndex, setExpandedIndex] = useState(null);
    const cache = useRef({});

    useEffect(() => {
        const loadMeta = async () => {
            if (cache.current[letter]) {
                setMeta(cache.current[letter]);
                setFilteredMeta(cache.current[letter]); // Initialize filteredMeta with full data
            } else {
                try {
                    const metaModule = await import(`../meta/${letter}.json`);
                    cache.current[letter] = metaModule.default;
                    setMeta(metaModule.default);
                    setFilteredMeta(metaModule.default); // Initialize filteredMeta with full data
                } catch (err) {
                    console.error("Error loading meta file:", err);
                }
            }
        };
        loadMeta();
    }, [letter]);

    const speakTheText = useCallback((text) => {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }, []);

    const expandDiv = (index) => {
        setExpandedIndex(index === expandedIndex ? null : index);
    };

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase(); // Normalize input
        if (!searchTerm) {
            setFilteredMeta(meta); // Reset to full list if input is empty
        } else {
            const filtered = meta.filter((rec) => rec.word.toLowerCase().startsWith(searchTerm));
            setFilteredMeta(filtered);
        }
    };

    return (
        <div className={styles.words_div}>
            <center>
                <input 
                    type='text' 
                    placeholder='Search a word...' 
                    onChange={handleSearch}
                />
            </center>
            {filteredMeta && filteredMeta.map((rec, idx) => (
                <div key={idx} onClick={() => expandDiv(idx)} className={styles.word_div_parent}>
                    <div className={styles.word_div}>
                        <h1>☘️ {rec.word}</h1>
                        <img 
                            onClick={(e) => { 
                                e.stopPropagation();
                                speakTheText(rec.word);
                            }} 
                            src={speaker} 
                            alt='Speaker' 
                            className={styles.speaker}
                        />
                    </div>
                    { expandedIndex === idx && 
                        <div className={styles.word_div_two}>
                            <h3 className={styles.meaning}>{rec.meaning_in_tamil}</h3>
                            <h4 className={styles.example}>{rec.example_in_tamil}</h4>
                            <h3 className={styles.meaning}>{rec.meaning}</h3>
                            <h4 className={styles.example}>{rec.example}</h4>
                        </div>
                    }
                </div>
            ))}
        </div>
    );
}