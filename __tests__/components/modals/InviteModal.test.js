import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import InviteModal from '@/components/modals/InviteModal';

const mockGameID = '123456';

jest.mock('next/router', () => ({
    useRouter: jest.fn(() => ({
        asPath: '/test-path',
    })),
}));

describe('InviteModal', () => {

    const originalClipboard = navigator.clipboard;
    beforeEach(() => {
        navigator.clipboard = {
            writeText: jest.fn(() => Promise.resolve()),
        };
    });

    afterEach(() => {
        navigator.clipboard = originalClipboard;
    });

    it('renders the InviteModal component', () => {
        render(<InviteModal text="Invite Friends" style="some-style" gameID={mockGameID} />);
        expect(screen.getByText('Invite Friends')).toBeInTheDocument();
    });

    it('opens and closes the modal', async () => {
        render(<InviteModal text="Invite Friends" style="some-style" gameID={mockGameID} />);
        const inviteButton = screen.getByTestId('button');
    
        fireEvent.click(inviteButton);
        expect(screen.getByTestId('modal')).toBeInTheDocument();
        expect(screen.getByText('Invite code:')).toBeInTheDocument();
        expect(screen.getByText(mockGameID)).toBeInTheDocument();
    
        const closeButton = screen.getByRole('button', { name: 'Close' });
        fireEvent.click(closeButton);
        await waitFor(() => expect(screen.queryByTestId('modal')).not.toBeInTheDocument());
    });

    it('copies the game ID when clicked', async () => {
        const originalAlert = window.alert;
        window.alert = jest.fn();
    
        render(<InviteModal text="Invite Friends" style="some-style" gameID={mockGameID} />);
        const inviteButton = screen.getByTestId('button');
    
        fireEvent.click(inviteButton);
        const gameIDLink = screen.getByText(mockGameID);
    
        fireEvent.click(gameIDLink);
        await waitFor(() => expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockGameID));
    
        window.alert = originalAlert;
    });

    it('renders the QRCodeGenerator component and displays the QR code', async () => {
        delete window.location;
        window.location = { origin: 'http://localhost' };
    
        render(<InviteModal text="Invite Friends" style="some-style" gameID={mockGameID} />);
        const inviteButton = screen.getByTestId('button');
    
        fireEvent.click(inviteButton);
        
        await waitFor(() => expect(screen.getByTestId('qrcode')).toBeInTheDocument());
    });
});
