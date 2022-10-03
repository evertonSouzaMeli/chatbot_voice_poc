import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {useState} from "react";
import base64 from 'react-native-base64';
import path from 'path'
import SpeechToTextV1 from 'ibm-watson/speech-to-text/v1';
import {IamAuthenticator} from "ibm-watson/auth";
import FileSystem from 'expo-file-system';
import axios from "axios";
import header from "react-native/Libraries/NewAppScreen/components/Header";

export default function App() {
  const [response, setResponse] = useState('');

  const transcription = async () => {
      const formData = new FormData();
      const audioFile = './records/audio-file.flac'

      formData.append('msg.payload', {
          uri: audioFile,
          type: 'audio/x-flac'
      })

      axios({
          method: "post",
          url: "http://127.0.0.1:1880/transcription",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
      })
          .then(function (response) {
              //handle success
              console.log(response);
          })
          .catch(function (response) {
              //handle error
              console.log(response);
          });
  }

    return (
        <View style={styles.container}>
          <View style={{flexDirection: 'row', margin: 5}}>
            <TextInput style={{borderWidth: 3, borderColor: 'lightblue'}} value={response}/>
          </View>
          <View style={{flexDirection: 'row', margin: 5}}>
            <Button title={"Send"} onPress={transcription}/>
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
