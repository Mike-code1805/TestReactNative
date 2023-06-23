import {useRef, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableOpacity,
  Text,
} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import Clipboard from '@react-native-clipboard/clipboard';
import RNPrint from 'react-native-print';

// http://samples.leanpub.com/thereactnativebook-sample.pdf
RNFetchBlob.config({
  trusty: true,
  fileCache: true,
  appendExt: 'pdf',
});

export default function App() {
  const onlineSource = {
    uri: 'http://api.paleconsultores.com:3000/api/AArchivo/url/MjA0OTEyMjgyOTcvMjAyMy8wNS8xNy9QREYvMjA0OTEyMjgyOTctMDEtRjAwMS0wMDAwMDc0MC5wZGY=',
    cache: true,
  };
  // const [pdfSource, setPdfSource] = useState(onlineSource);
  // const pdfRef = useRef<any>();

  // const encodePDFToBase64 = async (filePath: string) => {
  //   try {
  //     const res = await RNFetchBlob.fs.readFile(filePath, 'base64');
  //     return res;
  //   } catch (error) {
  //     console.error('Error al codificar el archivo en base64:', error);
  //     return null;
  //   }
  // };

  const printPDF = async () => {
    try {
      const resp = await RNPrint.print({
        filePath:
          'https://graduateland.com/api/v2/users/jesper/cv',
      });
      console.log('PDF impreso correctamente', resp);
    } catch (error) {
      console.error('Error al imprimir el PDF:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={onlineSource}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
          // encodePDFToBase64(filePath)
          //   .then(base64Data => {
          //     console.log('IM IN COPY CLIPBOARD');
          //     Clipboard.setString(base64Data);
          //     console.log('IT IS IN PORTAPAPER');
          //   })
          //   .catch(error => {
          //     console.error('Error al codificar el archivo en base64:', error);
          //   });
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {
          console.log(`Link pressed: ${uri}`);
        }}
        style={styles.pdf}
      />
      <TouchableOpacity onPress={printPDF}>
        <Text style={{color: 'black'}}>IMPRIMIR TEST PDF</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 32,
    borderWidth: 3,
  },
  pdf: {
    flex: 1,
    alignSelf: 'stretch',
  },
});
