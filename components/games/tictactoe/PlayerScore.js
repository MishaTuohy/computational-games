import { Table } from 'react-bootstrap';

export default function PlayerScore({ wins, state, id }) {
    const playerOne = state?.playerOne ? 'X: ' : 'Waiting: ';
    const scoreOne = id === state?.playerOne ? wins.me : wins.other;
    const playerTwo = state?.playerTwo ? 'O: ' : 'Waiting: ';
    const scoreTwo = id === state?.playerTwo ? wins.me : wins.other;

    return (
        <Table bordered hover size="sm" className={'text-center'}>
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{playerOne}</td>
                    <td>{scoreOne}</td>
                </tr>
                <tr>
                    <td>{playerTwo}</td>
                    <td>{scoreTwo}</td>
                </tr>
            </tbody>
        </Table>
    );
}
