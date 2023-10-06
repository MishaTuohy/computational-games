import ScreenTouchListener from '@/utils/listeners/ScreenTouchListener';

describe('ScreenTouchListener', () => {
    let element;
    let callback;
    let touchStartEvent;
    let touchEndEvent;

    beforeEach(() => {
        element = document.createElement('div');
        callback = jest.fn();

        touchStartEvent = new TouchEvent('touchstart', {
            touches: [{ clientX: 100, clientY: 200 }],
        });

        touchEndEvent = new TouchEvent('touchend');
    });

    it('creates a new ScreenTouchListener instance', () => {
        const screenTouchListener = new ScreenTouchListener(element, callback);

        expect(screenTouchListener).toBeInstanceOf(ScreenTouchListener);
        expect(screenTouchListener.element).toBe(element);
        expect(screenTouchListener.touchStartFunction).toBeInstanceOf(Function);
        expect(screenTouchListener.touchEndFunction).toBeInstanceOf(Function);
    });

    it('adds event listeners and calls the callback on touchstart', () => {
        new ScreenTouchListener(element, callback);
    
        element.dispatchEvent(touchStartEvent);
    
        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith(100, 200);
    });

    it('removes event listeners when calling unbind()', () => {
        const screenTouchListener = new ScreenTouchListener(element, callback);
    
        screenTouchListener.unbind();
    
        element.dispatchEvent(touchStartEvent);
        element.dispatchEvent(touchEndEvent);
    
        expect(callback).toHaveBeenCalledTimes(0);
    });

    it('does not prevent default event behavior when preventDefault is false', () => {
        new ScreenTouchListener(element, callback, false);
        const touchStartDefaultPrevented = jest.fn();
        const touchEndDefaultPrevented = jest.fn();
    
        element.addEventListener('touchstart', (event) => {
            touchStartDefaultPrevented(event.defaultPrevented);
        });
        element.addEventListener('touchend', (event) => {
            touchEndDefaultPrevented(event.defaultPrevented);
        });
    
        element.dispatchEvent(touchStartEvent);
        element.dispatchEvent(touchEndEvent);
    
        expect(touchStartDefaultPrevented).toHaveBeenCalledTimes(1);
        expect(touchStartDefaultPrevented).toHaveBeenCalledWith(false);
        expect(touchEndDefaultPrevented).toHaveBeenCalledTimes(1);
        expect(touchEndDefaultPrevented).toHaveBeenCalledWith(false);
    });
});
