import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import base64 from 'react-native-base64';
import audioFile from './records/audio-file.flac';
import axios from 'axios';

export default function App() {
  const [response, setResponse] = useState('');

  const sendMessageToWatson = async () => {
    const baseUrl = 'https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/c7c0c078-b14d-467f-a043-8f2088ad8e39'
    const key = "9oVgkbXmAhGAg_QZ49-Bm_sWtQxyQJKpzbwGiETd45oS"
    const encodedKey = base64.encode(`apikey:${key}`)

    const formData = new FormData()

    /*formData.append('audio', {
      uri: audioFile,
      type: 'audio/flac'
    })*/

    console.log(audioFile)

    await axios.post(baseUrl.concat('/v1/recognize'), audioFile, {
      headers: {
        Authorization: `Basic ${encodedKey}`,
        'Content-Type': `audio/flac`
      }
    }).then(res => console.log(res)).catch(err => console.log(err))
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', margin: 5  }}>
        <TextInput style={{ borderWidth: 3, borderColor: 'lightblue'}} value={response}/>
      </View>
      <View style={{ flexDirection: 'row', margin: 5  }}>
        <Button title={"Send"} onPress={ sendMessageToWatson }/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
