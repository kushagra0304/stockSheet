import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

const Order = () => {
    const { orderId } = useParams();
    const videoRef = useRef(null); // Reference for the video element
    const [scannedCode, setScannedCode] = useState(null);
    const [currentDeviceId, setCurrentDeviceId] = useState(null); // Store the current camera's device ID
    const [availableDevices, setAvailableDevices] = useState([]); // List of available video input devices

    const startCamera = async (deviceId) => {
        try {
            // Get the media stream for the selected camera
            const stream = await navigator.mediaDevices.getUserMedia({
                video: deviceId ? { deviceId: { exact: deviceId } } : true,
            });
            videoRef.current.srcObject = stream;

            // Use Barcode Detection API to scan QR codes
            const barcodeDetector = new BarcodeDetector({ formats: ['qr_code'] });

            const scanQRCode = () => {
                barcodeDetector
                    .detect(videoRef.current)
                    .then((barcodes) => {
                        if (barcodes.length > 0) {
                            setScannedCode(barcodes[0].rawValue);
                        }
                    })
                    .catch((err) => {
                        console.error("Barcode detection failed:", err);
                    });

                requestAnimationFrame(scanQRCode); // Continue scanning
            };

            requestAnimationFrame(scanQRCode);
        } catch (err) {
            console.error("Camera access failed:", err);
        }
    };

    useEffect(() => {
        const getAvailableCameras = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const videoDevices = devices.filter((device) => device.kind === "videoinput");
            setAvailableDevices(videoDevices);

            // Use the first camera by default
            if (videoDevices.length > 0) {
                setCurrentDeviceId(videoDevices[0].deviceId);
                startCamera(videoDevices[0].deviceId);
            }
        };

        getAvailableCameras();

        return () => {
            // Cleanup: Stop all tracks when the component is unmounted
            if (videoRef.current?.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, []);

    const switchCamera = () => {
        const currentIndex = availableDevices.findIndex((device) => device.deviceId === currentDeviceId);
        const nextIndex = (currentIndex + 1) % availableDevices.length;
        const nextDevice = availableDevices[nextIndex];

        setCurrentDeviceId(nextDevice.deviceId);

        if (videoRef.current?.srcObject) {
            // Stop the current video stream
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
        }

        // Start the next camera
        startCamera(nextDevice.deviceId);
    };

    return (
        <div>
            <h1>Order ID: {orderId}</h1>
            <div>
                {scannedCode ? (
                    <p>Scanned QR Code: {scannedCode}</p>
                ) : (
                    <p>Scanning for QR Code...</p>
                )}
            </div>
            <video ref={videoRef} autoPlay playsInline style={{ width: "80vw", height: "auto" }} />
            {availableDevices.length > 1 && (
                <button onClick={switchCamera}>Switch Camera</button>
            )}
        </div>
    );
};

export default Order;
