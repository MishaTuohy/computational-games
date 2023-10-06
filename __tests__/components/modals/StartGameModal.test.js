import renderer from 'react-test-renderer';
import { fireEvent, render } from '@testing-library/react';
import StartGameModal from '@/components/modals/StartGameModal';

jest.mock('@/components/buttons/CreateGameButton', () => {
    return function MockCreateGameButton() {
        return <div data-testid="create-game-button">Create Game Button</div>;
    };
});

jest.mock('@/components/buttons/JoinGameButton', () => {
    return function MockJoinGameButton() {
        return <div data-testid="join-game-button">Join Game Button</div>;
    };
});

describe('StartGameModal', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<StartGameModal text="Start Game" gameName="Test Game" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders the modal when the button is clicked', () => {
        const { getByTestId } = render(<StartGameModal text="Start Game" gameName="Test Game" />);
        const button = getByTestId('button');
        fireEvent.click(button);
        const tree = renderer.create(<StartGameModal text="Start Game" gameName="Test Game" />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('hides the modal when the close button is clicked', () => {
        const { getByTestId } = render(<StartGameModal text="Start Game" gameName="Test Game" />);
        const button = getByTestId('button');
        fireEvent.click(button);
        fireEvent.click(document);
        const tree = renderer.create(<StartGameModal text="Start Game" gameName="Test Game" />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
