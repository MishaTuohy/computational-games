import QRCodeGenerator from '@/components/games/QRCodeGenerator';
import { render, screen, waitFor } from '@testing-library/react';
import QRCode from 'qrcode';

jest.mock('qrcode', () => ({
    toDataURL: jest.fn(),
}));

jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
        asPath: '/test-path',
    })),
}));

describe('QRCodeGenerator', () => {
    it('does not render a QR code if show prop is false', () => {
        render(<QRCodeGenerator show={false} />);
        const qrCodeElement = screen.queryByAltText('QR Code');
        expect(qrCodeElement).not.toBeInTheDocument();
    });

    it('renders a QR code if show prop is true', async () => {
        const testDataURL = 'data:image/png;base64,TESTDATA';
        QRCode.toDataURL.mockResolvedValueOnce(testDataURL);
        render(<QRCodeGenerator show={true} />);
        const qrCodeElement = await screen.findByAltText('QR Code');
        expect(qrCodeElement).toBeInTheDocument();
        expect(qrCodeElement.src).toBe(testDataURL);
        expect(qrCodeElement.style.width).toBe('300px');
        expect(qrCodeElement.style.height).toBe('300px');
    });

    it('handles errors while generating QR code', async () => {
        const testError = new Error('Test error');
        QRCode.toDataURL.mockRejectedValueOnce(testError);
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        render(<QRCodeGenerator show={true} />);
        const qrCodeElement = screen.queryByAltText('QR Code');
      
        await waitFor(() => expect(qrCodeElement).not.toBeInTheDocument());
      
        expect(consoleSpy).toHaveBeenCalled();
        consoleSpy.mockRestore();
    });
});
