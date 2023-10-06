import { default as errorHandler } from '@/helpers/errorHandler';

describe('errorHandler function', () => {
    it('should log error and context to console', () => {
        const error = new Error('Something went wrong');
        const context = { userId: 123 };
        const consoleSpy = jest.spyOn(console, 'error');

        errorHandler(error, context);

        expect(consoleSpy).toHaveBeenCalledWith('Error:', error, 'Context:', context);
    });

    it('should display message in alert if displayMessage is not "off"', () => {
        const error = new Error('Something went wrong');
        const context = { userId: 123 };
        const displayMessage = 'An error occurred';
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    
        errorHandler(error, context, displayMessage);

        expect(alertSpy).toHaveBeenCalledWith(displayMessage);
    });

    it('should not display message if displayMessage is "off"', () => {
        const error = new Error('Something went wrong');
        const context = { userId: 123 };
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

        errorHandler(error, context, 'off');

        expect(alertSpy).not.toHaveBeenCalled();
    });
});
