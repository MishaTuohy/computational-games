import { default as KeyPressListener } from '@/utils/listeners/KeyPressListener';

document.addEventListener = jest.fn();
document.removeEventListener = jest.fn();

describe('KeyPressListener', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('constructor should bind keydown and keyup event listeners', () => {
        const keyCode = 'KeyA';
        const callback = jest.fn();

        const listener = new KeyPressListener(keyCode, callback);

        expect(document.addEventListener).toHaveBeenCalledTimes(2);
        expect(document.addEventListener).toHaveBeenNthCalledWith(1, 'keydown', listener.keydownFunction);
        expect(document.addEventListener).toHaveBeenNthCalledWith(2, 'keyup', listener.keyupFunction);
    });

    test('unbind should remove keydown and keyup event listeners', () => {
        const keyCode = 'KeyA';
        const callback = jest.fn();

        const listener = new KeyPressListener(keyCode, callback);
        listener.unbind();

        expect(document.removeEventListener).toHaveBeenCalledTimes(2);
        expect(document.removeEventListener).toHaveBeenNthCalledWith(1, 'keydown', listener.keydownFunction);
        expect(document.removeEventListener).toHaveBeenNthCalledWith(2, 'keyup', listener.keyupFunction);
    });

    test('keydown should trigger the callback if the correct key is pressed', () => {
        const keyCode = 'KeyA';
        const callback = jest.fn();

        const listener = new KeyPressListener(keyCode, callback);

        const keydownEvent = new KeyboardEvent('keydown', { code: keyCode });
        listener.keydownFunction(keydownEvent);

        expect(callback).toHaveBeenCalled();
    });

    test('keydown should not trigger the callback if the wrong key is pressed', () => {
        const keyCode = 'KeyA';
        const callback = jest.fn();

        const listener = new KeyPressListener(keyCode, callback);

        const keydownEvent = new KeyboardEvent('keydown', { code: 'KeyB' });
        listener.keydownFunction(keydownEvent);

        expect(callback).not.toHaveBeenCalled();
    });

    test('keyup should make the key safe again after keydown', () => {
        const keyCode = 'KeyA';
        const callback = jest.fn();

        const listener = new KeyPressListener(keyCode, callback);

        const keydownEvent = new KeyboardEvent('keydown', { code: keyCode });
        listener.keydownFunction(keydownEvent);

        expect(callback).toHaveBeenCalled();

        callback.mockClear();

        const keyupEvent = new KeyboardEvent('keyup', { code: keyCode });
        listener.keyupFunction(keyupEvent);

        listener.keydownFunction(keydownEvent);

        expect(callback).toHaveBeenCalled();
    });
});