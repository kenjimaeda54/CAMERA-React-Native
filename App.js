import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import { Camera } from "expo-camera"
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';


export default function App() {
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [hasPermission, setHasPermission] = useState(null)
  const [open, setOpen] = useState(false);
  const [checkPicture, setCheckPicture] = useState(null)
  const [photo, setPhoto] = useState(null)
  const camRef = useRef(null);




  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      setHasPermission(status === 'granted');
    })();

  }, []);


  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function takePicture() {
    if (camRef) {

      const data = await camRef.current.takePictureAsync();
      //boa pratica para saber oque uma função assincrona retorna,chamar
      //console log. Nesse caso retorna um objeto,neste caso um desses 
      //objeto e uir, por isso fica data.uir
      console.log(data)
      setCheckPicture(data.uri);
      setOpen(true)
    }
  }

  async function salvePicture() {
    const assent = await MediaLibrary.createAssetAsync(checkPicture)
      .then(() => {

        alert("Salvo com sucesso")
        setOpen(false)

      })
      .catch((error) => {

        alert(error.code)

      })
  }

  return (

    <SafeAreaView style={styles.container}>

      <StatusBar hidden={true} />

      <Camera
        type={type}
        style={styles.preview}
        ref={camRef}
      >
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }} >

          <TouchableOpacity
            style={{
              justifyContent: 'flex-end',
              marginLeft: 180,

            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 20, marginBottom: 13, color: "#fff", textAlign: 'center' }}> Trocar </Text>
          </TouchableOpacity>

        </View>

      </Camera>

      <TouchableOpacity style={styles.button} onPress={takePicture} >

        <FontAwesome name="camera" size={25} color="#fff" />

      </TouchableOpacity>

      {open &&

        <Modal visible={open} animationType="slide" transparent={false}  >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }} >

            <TouchableOpacity style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
              onPress={() => setOpen(false)} >
              {/* se deixar so setOpen vai sempre chamar a função assim o modal não abre*/}
              <FontAwesome name="window-close" size={25} color="red" />

            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}
              onPress={salvePicture}
            >

              <FontAwesome name="upload" size={25} color="black" />

            </TouchableOpacity>


            <Image source={{ uri: checkPicture }}

              style={{ width: '100%', height: 300, borderRadius: 20 }}

            />
            {/*propriedade padrão do source é 
          source={{uir:"link"}} ou source={require('link')} 
          por isso fica dessa forma acima */}

          </View>

        </Modal>

      }

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  preview: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    margin: 20,
    borderRadius: 10,
    width: '40%',
  }



});
