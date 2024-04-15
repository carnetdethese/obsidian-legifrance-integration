
export function replaceMark(texte:string, container:HTMLElement) {
    texte.split(/(<mark>.*?<\/mark>)/g).forEach(segment => {
        if (segment.startsWith('<mark>')) {
            // Create <mark> element for each <mark> tag
            const markEl = document.createElement('mark');
            markEl.textContent = segment.replace(/<\/?mark>/g, ''); // Remove <mark> tags
            container.appendChild(markEl);
        } else {
            // Append non-marked text segments directly
            const textNode = document.createTextNode(segment);
            container.appendChild(textNode);
        }
    });
    
    return container
}