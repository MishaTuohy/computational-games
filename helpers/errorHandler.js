export default function errorHandler(error, context = null, displayMessage='off') {
    console.error('Error:', error, 'Context:', context);
    if(displayMessage !== 'off') {
        alert(displayMessage);
    }
}
