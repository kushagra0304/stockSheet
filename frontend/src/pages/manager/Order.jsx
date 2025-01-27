import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import OrderDisplay from "../../components/OrderDisplay";
import { addReelToOrder, getOrder, dispatchOrder } from "../../services/order";

const getStream = async () => {
    return await navigator.mediaDevices.getUserMedia({
        video: true
        // video: {
        //     facingMode: { exact: "environment" },
        // },                   
    });
}

const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });


const useBarcodeScanner = (videoRef) => {
    const intervalIdRef = useRef(null);
    const [barcode, setBarcode] = useState(null);

    const startScanning = useCallback(() => {
        if (intervalIdRef.current) return;

        intervalIdRef.current = setInterval(async () => {
            if (videoRef.current && barcodeDetector) {
                const barcodes = await barcodeDetector.detect(videoRef.current);
                if (barcodes.length > 0) {
                    setBarcode(barcodes[0].rawValue);
                }
            }
        }, 1000);
    }, [videoRef]);

    const stopScanning = useCallback(() => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
            intervalIdRef.current = null;
        }
    }, []);

    useEffect(() => {
        return () => stopScanning(); // Cleanup on unmount
    }, [stopScanning]);

    return { startScanning, stopScanning, barcode };
};

const Order = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const videoRef = useRef();
    const [stream, setStream] = useState();
    const { startScanning, stopScanning, barcode } = useBarcodeScanner(videoRef);

    const startCamera = useCallback(async () => {
        const stream = await getStream();
        setStream(stream);

        videoRef.current.srcObject = stream;

        startScanning();
    }, [startScanning])

    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());

            videoRef.current.srcObject = null;

            stopScanning();
        }  
    }, [stopScanning, stream]);

    const refreshOrder = () => {
        if(!orderId) return;
        getOrder(orderId).then(((res) => setOrder(res.data)))
    };

    useEffect(() => {
        if(!(barcode && orderId)) return;

        addReelToOrder({
            orderId: orderId,
            reelId: barcode
        }).then(() => refreshOrder());

    }, [barcode, orderId])

    useEffect(() => {
        startCamera();
        refreshOrder();
        return () => stopCamera(); 
    }, []);

    useEffect(() => {
        const visibilityChangeHandler = () => {
            if (document.hidden) {    
                stopCamera();
            } else {
                startCamera();
            }
        }

        document.addEventListener("visibilitychange", visibilityChangeHandler);

        return () => {
            document.removeEventListener("visibilitychange", visibilityChangeHandler)
        }
    }, [startCamera, stopCamera])

    return (
        <div>
            <div style={{ display: "flex", gap: '1rem', alignItems: 'center', flexDirection: 'column', margin: '1rem' }}>
                <video ref={videoRef} autoPlay playsInline style={{ width: "80%", height: "auto", borderRadius: '12px', marginBottom: '1rem' }} />
                {barcode && <p>Scanned Code: {barcode}</p>}
                <div style={{width: '100%'}}>
                    {order && <OrderDisplay order={order} />}
                </div>
                <button onClick={() => dispatchOrder(orderId)} style={{ width: '100%', height: '3rem' }}>Dispatch</button>
            </div>
        </div>
    );
};

export default Order;