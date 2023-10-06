import Spinner from 'react-bootstrap/Spinner';

function Loader() {
    return (
        <div className="fixed-bottom fixed-left m-3" data-testid="loader">
            <Spinner animation="border" role="status" />
        </div>
    );
}

export default Loader;
