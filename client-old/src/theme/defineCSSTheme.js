/** Utility module for defining CSS theming variables in :root element.
 * Imported once in index.js to execute.
*/

import palette from './palette';

const doc = document.querySelector(':root');
doc.style.setProperty('--theme-darkest', palette.darkest);
doc.style.setProperty('--theme-darker', palette.darker);
doc.style.setProperty('--theme-dark', palette.dark);
doc.style.setProperty('--theme-medium', palette.medium);
doc.style.setProperty('--theme-light', palette.light);
doc.style.setProperty('--theme-lightest', palette.lightest);
doc.style.setProperty('--theme-complement', palette.complement);
doc.style.setProperty('--theme-complementDark', palette.complementDark);
doc.style.setProperty('--theme-alternate', palette.alternate);

export default null;
