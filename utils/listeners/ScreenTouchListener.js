export default class ScreenTouchListener {
    constructor(element, callback, preventDefault = true) {
        this.element = element;
        this.touchStartFunction = function(event) {
            if (preventDefault) {
                event.preventDefault();
            }
            const touch = event.touches[0];
            callback(touch.clientX, touch.clientY);
        };
        this.touchEndFunction = function(event) {
            if (preventDefault) {
                event.preventDefault();
            }
        };
        element.addEventListener('touchstart', this.touchStartFunction);
        element.addEventListener('touchend', this.touchEndFunction);
    }
  
    unbind() { 
        this.element.removeEventListener('touchstart', this.touchStartFunction);
        this.element.removeEventListener('touchend', this.touchEndFunction);
    }
}
