# CAMERA-React-Native
Pequena aplicação com camera,
# Pequena aplicação com camera. Tirando foto,salvando e buscando
### Dependencias do projeto
### expo install expo-camera
### expo install expo-media-library
### expo install expo-permisssions
### expo install expo-image-picker
### Recursos
- Apliquei metodos de abrir modal apos uma foto ser retirada
- Apliquei icones da biblioteca expo,não e necessário importar nenhuma biblioteca caso esteja usando expo
- Icones usados foram da familia  FontAwesome, documentação completa https://docs.expo.io/guides/icons/#expovector-icons
- Documentação da Media-library para salvar as fotos https://docs.expo.io/versions/latest/sdk/media-library/
- Documentação da expo-camera, https://docs.expo.io/versions/latest/sdk/camera/
- Utilizei recursos de aplicar if dentro do estado(useState(if...)) ,para realizar a mudança de estado de forma condicional
- Usei ciclos de vida e toda aplicação esta em Hooks
- Documentação para buscar fotos salvas no seu celular e colocar no aplicativo.https://docs.expo.io/versions/latest/sdk/imagepicker/#imagepickercamerapermissionresponse
- Usei recurso identico ao Whatt Sapp  com Image Picker, pessoa busca alguma foto no seu celular e envia para o aplicativo
