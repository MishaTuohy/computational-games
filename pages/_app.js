import 'bootstrap/dist/css/bootstrap.css';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import ErrorBoundary from '@/helpers/ErrorBoundary';
import { AuthProvider } from '@/services/firebase/auth/AuthProvider';

export default function App({ Component, pageProps }) {
    const Layout = Component.getLayout || ((page) => page);
    const router = useRouter();

    return (
        <AuthProvider>
            {Layout(
                <ErrorBoundary router={router}>
                    <Component {...pageProps} />
                </ErrorBoundary>
            )}
        </AuthProvider>
    );
}
