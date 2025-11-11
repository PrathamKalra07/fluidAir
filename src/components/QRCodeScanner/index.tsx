import React, { useRef } from 'react';
import { Alert, Modal, SafeAreaView, StyleSheet } from 'react-native';
import {
  Camera,
  CameraRuntimeError,
  useCameraDevice,
  useCodeScanner,
} from 'react-native-vision-camera';

interface QRCodeScannerProps {
  onScan: (value: string) => void;
  onClose: () => void;
}

const QRCodeScanner = ({ onScan, onClose }: QRCodeScannerProps) => {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      if (codes.length > 0 && codes[0]?.value) {
        const scannedValue = codes[0].value;
        console.log('✅ QR Code Scanned:', scannedValue);
        onScan(scannedValue);   // send it back to RequestService
        onClose();              // close modal
      }
    },
  });

  const onError = (error: CameraRuntimeError) => {
    Alert.alert('Camera Error', error.message);
    onClose();
  };

  if (device == null) {
    Alert.alert('Error', 'No camera device found');
    onClose();
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Modal presentationStyle="fullScreen" animationType="slide" onRequestClose={onClose}>
        <Camera
          ref={camera}
          style={styles.fullScreenCamera}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
          onError={onError}
        />
      </Modal>
    </SafeAreaView>
  );
};

export default QRCodeScanner;

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  fullScreenCamera: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    zIndex: 100,
  },
});
