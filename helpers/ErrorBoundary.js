import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error({error, errorInfo});
    }

    componentDidUpdate() {
        const { hasError } = this.state;
        const { router } = this.props;

        if (hasError && router) {
            router.push('/');
        }
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        return hasError ? null : children;
    }
}

export default ErrorBoundary;
