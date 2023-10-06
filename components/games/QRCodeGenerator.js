import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { useRouter } from 'next/router';
import errorHandler from '@/helpers/errorHandler';

export default function QRCodeGenerator({ show }) {
    const [qrCodeDataURL, setQrCodeDataURL] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (show) {
            const currentPageURL = `${window.location.origin}${router.asPath}`;
            QRCode.toDataURL(currentPageURL, { width: 300 })
                .then((dataUrl) => setQrCodeDataURL(dataUrl))
                .catch((error) => {
                    errorHandler(error, 'QRCodeGenerator');
                });
        }
    }, [show, router.asPath]);

    return (
        <>
            {qrCodeDataURL && (
                <img
                    src={qrCodeDataURL}
                    alt="QR Code"
                    style={{ width: '300px', height: '300px' }}
                    data-testid="qrcode"
                />
            )}
        </>
    );
}
