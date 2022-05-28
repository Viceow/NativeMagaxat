import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Entypo';
import DocumentPicker from 'react-native-document-picker';
export const AvatarAdd = props => {
  const [image, setImage] = useState(null);
  const [selected, setSelected] = useState(false);
  const [singleFile, setSingleFile] = useState(null);

  console.log(props);
  const selectFile = async () => {
    setSelected(true);
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setSingleFile(res[0]);
      setImage(res[0].uri);
    } catch (err) {
      setSingleFile(null);
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  let img;
  if (props?.image !== undefined) {
    img = {uri: props?.image};
  } else {
  }

  return (
    <TouchableOpacity onPress={selectFile} style={styles.container}>
      {selected === false ? (
        <Image style={styles.avatar} {...props} source={img} />
      ) : (
        <Image style={styles.avatar} {...props} source={{uri: image}} />
      )}

      <View style={styles.icon}>
        <Icon name="camera" size={24} color="#B9B9B9" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  avatar: {
    paddingTop: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    padding: 20,
    resizeMode: 'cover',
  },
  icon: {
    position: 'absolute',
    backgroundColor: 'black',
    bottom: 0,
    minWidth: '100%',
    height: '50%',
    opacity: 0.5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
