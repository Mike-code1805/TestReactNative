import {Button, StyleSheet, Text, View, Image} from 'react-native';
import {captureRef} from 'react-native-view-shot';
import {useRef, useState} from 'react';

export default function App() {
  const viewToSnapshotRef = useRef<any>();
  const [snapshotImg, setSnapshotImg] = useState();

  const snapshot = async () => {
    const result: any = await captureRef(viewToSnapshotRef, {
      result: 'data-uri',
    });
    console.log(result);
    setSnapshotImg(result);
  };

  return (
    <View style={styles.container}>
      <View ref={viewToSnapshotRef} style={styles.snapshot}>
        <Text>Contact Details</Text>
        <Text>Names: James Smith</Text>
        <Text>Phone: 555-5555</Text>
      </View>
      <Button title="Take Snapshot" onPress={snapshot} />
      {snapshotImg && <Text>Snapshot Preview:</Text>}
      {snapshotImg && (
        <Image
          resizeMode="contain"
          style={styles.snapshotImg}
          source={{uri: snapshotImg}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  snapshot: {
    borderColor: '#000000',
    borderWidth: 2,
    backgroundColor: '#00ffff',
    margin: 16,
    padding: 16,
  },
  snapshotImg: {
    width: 400,
    height: 200,
    margin: 16,
  },
});
