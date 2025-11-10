import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera';
import { scanBarcodes, BarcodeFormat } from 'react-native-vision-camera-mlkit';
import { runOnJS } from 'react-native-reanimated';

export default function QRScanner({ onScan }: { onScan: (value: string) => void }) {
  const devices = useCameraDevices();
  const device = devices.back;

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const barcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE]);
    for (const barcode of barcodes) {
      runOnJS(onScan)(barcode.rawValue);
    }
  }, [onScan]);

  if (!device) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
