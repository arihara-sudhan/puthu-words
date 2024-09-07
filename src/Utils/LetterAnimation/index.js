import "./styles.css";

export default function LetterAnimation({ text }) {
    const words = text.split(' ').map(word => word + ' ');
    return (
      <h1>
        {words.map((word, index) => (
          <span key={index} className="letter" style={{ animationDelay: `${index * 0.1}s` }}>
            {word}
          </span>
        ))}
      </h1>
    );
}