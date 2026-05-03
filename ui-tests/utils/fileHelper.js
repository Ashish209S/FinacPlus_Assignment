import fs from 'fs';

export function writeBookDetails(details) {
    fs.writeFileSync('bookDetails.txt', details, { flag: 'w' });
}