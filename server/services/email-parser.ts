import { decodeQuotedPrintable, decodeLatin2} from './decoder';

export let parseMail = (raw: string) => {
    let latin2 = raw.includes('8859-2');
    let subject = findBetween(raw, '\\r\\nSubject', '\\r\\n');
    let aroundHtmlContent = findBetween(raw, 'Content-Type: text/html;', '--\\r\\n');
    let htmlContent = findBetween(aroundHtmlContent, 'quoted-printable', '\\r\\n--');
    let aroundTextContent = findBetween(raw, 'Content-Type: text/plain;', 'Content-Type: text/html;');
    let textContent = findBetween(aroundTextContent, 'quoted-printable', '\\r\\n--');

    [subject, htmlContent, textContent] = [subject, htmlContent, textContent].map(text => {
        if (text) {
            let decodedText = decodeQuotedPrintable(text)
                .replace(/\\r/g, '\r')
                .replace(/\\n/g, '\n')
                .replace(/\\"/g, '\"');
            return latin2 ? decodeLatin2(decodedText) : decodedText;
        }
    });
    return {subject, htmlContent, textContent};
};

let findBetween = (raw: string, startString: string, endString: string) => {
    if (raw && raw.includes(startString)) {
        let startIndex = raw.indexOf(startString) + startString.length;
        let endIndex = raw.indexOf(endString, startIndex);
        return raw.substring(startIndex, endIndex);
    }
};
