import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { Audio } from "expo-av";
import axios from "axios";

export default function App() {
    const [permission, setPermission] = React.useState("");
    const [recording, setRecording] = React.useState("");

    const sendMessage = (recording) => {
        const formData = new FormData();
        formData.append("file", {
            uri: recording.getURI(),
            name: "test.wav",
            type: "audio/wav",
        });
        axios
            .post('https://nodered-app-1tdsr-fiap-2021.mybluemix.net/transcription', formData, {
                responseType: 'text',
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then( async function (response) {
                /** PEGAR AUDIO CONVERTIDO PRA TEXTO AQUI **/
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
                console.error(error.response);
            });
    }

    async function startRecording() {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (permission.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });
                const recording = new Audio.Recording();
                try {
                    await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
                    await recording.startAsync();
                } catch (err) {
                    console.log(err)
                }
                setRecording(recording)
            } else {
                setPermission("Please grant permission to app to access microphone");
            }
        } catch (err) {
            console.error("Failed to start recording", err);
        }
    }

    async function stopRecording() {
        await recording.stopAndUnloadAsync();
        let resp = recording
        setRecording(undefined)
        sendMessage(resp)
    }

    return (
        <View style={styles.container}>
            <Text>{permission}</Text>
            <Button
                title={recording ? "Stop Recording" : "Start Recording"}
                onPress={recording ? stopRecording : startRecording}
            />
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    fill: {
        flex: 1,
        margin: 16,
    },
    button: {
        margin: 16,
    },
});
