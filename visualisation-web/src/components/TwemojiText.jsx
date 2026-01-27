import React from 'react';
import twemoji from 'twemoji';

const TwemojiText = ({ text = '', className = '' }) => {
    // twemoji.parse returns the string with <img> tags replacing emoji characters
    // We use the default CDN which is usually configured in the library
    const parsedContext = twemoji.parse(text, {
        base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.3/assets/',
        folder: '72x72',
        ext: '.png'
    });

    return (
        <span
            className={className}
            dangerouslySetInnerHTML={{ __html: parsedContext }}
        />
    );
};

export default TwemojiText;
