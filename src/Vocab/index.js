import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from "./Vocab.module.css";
import speaker from "./assets/speaker.png";

export default function Vocab({ letter, backCallback }) {
    const [meta, setMeta] = useState(null);
    const [filteredMeta, setFilteredMeta] = useState(null);
    const [expandedWord, setExpandedWord] = useState(null);
    const cache = useRef({});

    useEffect(() => {
        const loadMeta = async () => {
            if (cache.current[letter]) {
                setMeta(cache.current[letter]);
                setFilteredMeta(cache.current[letter]);
            } else {
                try {
                    const metaModule = await import('../meta/all_words.json');
                    const letterData = metaModule.default[letter] || [];
                    cache.current[letter] = letterData;
                    setMeta(letterData);
                    setFilteredMeta(letterData);
                } catch (err) {
                    console.error("Error loading meta file:", err);
                    setMeta([]);
                    setFilteredMeta([]);
                }
            }
        };
        loadMeta();
    }, [letter]);

    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape' && expandedWord) {
                setExpandedWord(null);
            }
        };

        window.addEventListener('keydown', handleEscKey);
        return () => {
            window.removeEventListener('keydown', handleEscKey);
        };
    }, [expandedWord]);

    const speakTheText = useCallback((text) => {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }, []);

    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (!searchTerm) {
            setFilteredMeta(meta);
        } else {
            const filtered = meta.filter((rec) => rec.word.toLowerCase().startsWith(searchTerm));
            setFilteredMeta(filtered);
        }
    };

    return (
        <div className={styles.words_div}>
            <div className={styles.word_count_container}>
                <h2>{meta ? `${meta.length} Words` : 'Loading...'}</h2>
                <span className={styles.back_text} onClick={backCallback}>«BACK</span>
            </div>
            <input
                type='text'
                placeholder='Search a word...'
                onChange={handleSearch}
            />
            <h1 className={styles.back} onClick={backCallback}>«</h1>
            <div className={styles.word_parent}>
                {filteredMeta && filteredMeta.map((rec, idx) => (
                    <div key={idx} onClick={() => setExpandedWord(rec)} className={styles.word_div_parent}>
                        <div className={styles.word_div}>
                            <h1>☘️ {rec.word}</h1>
                        </div>
                    </div>
                ))}
            </div>
            {expandedWord && (
                <div className={styles.word_div_two}>
                    <button className={styles.close_button} onClick={() => setExpandedWord(null)}>×</button>
                    <div className={styles.word_header}>
                        <h2 className={styles.word_title}>{expandedWord.word}</h2>
                        <img
                            onClick={() => speakTheText(expandedWord.word)}
                            src={speaker}
                            alt='Speaker'
                            className={styles.speaker}
                        />
                    </div>
                    <h3>{expandedWord.meaning}</h3>
                    <h3 className="tamil-text">{expandedWord.meaning_in_tamil}</h3>
                    <h4>{expandedWord.example}</h4>
                    <h4 className="tamil-text">{expandedWord.example_in_tamil}</h4>
                    <h1 className={styles.emoji}>{expandedWord.emoji}</h1>
                </div>
            )}
        </div>
    );
}