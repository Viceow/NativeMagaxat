import React, {useRef} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Controller, useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import VideoPlayer from 'react-native-video-player';
import {useDispatch, useSelector} from 'react-redux';
import {sendComment} from '../../../stores/post/postActions';
import HeaderBackSearch from '../../../components/HeaderComponents/HeaderBackSearch';
import {useNavigation} from '@react-navigation/native';

const CommentScreen = props => {
  const navigation = useNavigation();
  const scrollViewRef = useRef();
  const dispatch = useDispatch();
  const {control, handleSubmit, reset} = useForm();
  let user = props?.route.params.user;
  let video = props?.route.params.video;
  let description = props?.route.params.description;
  let id = props?.route.params.id;
  const {posts} = useSelector(state => state.post);
  const foundPost = posts?.find(el => el?.id === id);
  const userProfilePage = () => {
    navigation.navigate('AccounProfiletScreen', {
      id: user?.id,
    });
  };
  const submitFormHandler = handleSubmit(async submitData => {
    try {
      reset({}, {keepValues: false});

      dispatch(sendComment(id, submitData));
    } catch (error) {
      console.log(error);
    }
  });
  let commentContent = foundPost?.comments?.map(elem => {
    let imgComment;
    if (elem.user.image !== null) {
      imgComment = {uri: elem.user.image};
    } else {
      imgComment = require('../../../assets/defoult.png');
    }
    return (
      <View key={elem.id}>
        <View style={styles.userProfile}>
          <View style={styles.imgFrame}>
            <TouchableOpacity onPress={userProfilePage}>
              <Image source={imgComment} style={styles.userImage} />
            </TouchableOpacity>
          </View>
          <View>
            <Text>{elem.name} </Text>
            <Text />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{elem.user.name} </Text>
            <Text style={styles.userName}>{elem.user.lastname} </Text>
          </View>
        </View>
        <View style={styles.commentBody}>
          <Text style={styles.timeText}>{elem.created_at} </Text>
          <Text style={styles.commentText}>{elem.title}</Text>
        </View>
      </View>
    );
  });
  let content;
  if (props.route.params.video) {
    content = (
      <VideoPlayer
        video={{uri: video}}
        autoplay={false}
        defaultMuted={true}
        thumbnail={require('./../../../assets/logo.png')}
        style={styles.mediaVideo}
      />
    );
  } else {
    content = (
      <ImageBackground
        source={{uri: props?.route.params.img}}
        resizeMode="center"
        style={styles.usersProfileBGimage}
      />
    );
  }
  return (
    <View style={styles.container}>
      <HeaderBackSearch />
      <ScrollView
        showsVerticalScrollIndicator={false}
        horizontal={false}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }
        style={styles.scroll}>
        <View style={styles.vedioContent}>
          <View style={styles.userProfile}>
            <View style={styles.imgFrame}>
              <Image source={{uri: user?.image}} style={styles.userImage} />
            </View>
            <View style={styles.userInfoNames}>
              <Text style={styles.userNames}>{user?.name} </Text>
              <Text style={styles.userNames}>{user?.lastname} </Text>
            </View>
          </View>
          <View style={styles.vedioBodyContent}>{content}</View>
          <Text style={styles.userNames}>
            {description === 'undefined' ? null : description}{' '}
          </Text>
          <Text style={styles.textDescription}>{user.title}</Text>
        </View>
        <View style={styles.comentBox}>{commentContent}</View>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.containerKeyBoard}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <Controller
                control={control}
                name="title"
                render={({field: {onChange, value, onBlur}}) => {
                  return (
                    <TextInput
                      placeholder="Add Your Comment ..."
                      value={value}
                      style={styles.textInput}
                      multiline
                      onChangeText={onChange}
                      underlineColorAndroid="white"
                    />
                  );
                }}
              />
              <TouchableOpacity onPress={submitFormHandler}>
                <Icon
                  name="send-circle"
                  size={54}
                  color="#BB9E79"
                  style={{marginBottom: 5, marginRight: 5}}
                />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

export default CommentScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 15,
    backgroundColor: '#F2F2F2',
    height: '100%',
  },
  vedioContent: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderBottomColor: 'silver',
    paddingBottom: 25,
    borderBottomWidth: 1,
  },
  vedio: {
    height: 160,
    borderRadius: 8,
  },
  vedioBodyContent: {
    width: '100%',
  },
  mediaVideo: {
    borderRadius: 8,
  },
  userProfile: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 15,
    paddingLeft: 5,
  },
  imgFrame: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#E6E6E6',
    width: 54,
    height: 54,
  },
  userImage: {
    width: 57,
    height: 57,
    borderRadius: 999,
    borderColor: '#E6E6E6',
    borderWidth: 3,
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: 20,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  scroll: {
    width: '90%',
  },
  comentBox: {
    marginTop: 30,
  },
  commentBody: {
    minHeight: 60,
    backgroundColor: '#EAEAEA',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  commentText: {
    color: 'black',
  },
  inputStyle: {
    width: '100%',
    height: 60,
  },
  inner: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    borderColor: '#E5E5E5',
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    maxHeight: 110,
    width: '80%',
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 15,
    backgroundColor: 'white',
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
  containerKeyBoard: {
    flex: 1,
    marginBottom: 80,
  },
  textDescription: {
    marginTop: 20,
    color: '#666666',
  },
  usersProfileBGimage: {
    minWidth: 350,
    height: 170,
  },
  timeText: {
    fontSize: 10,
    textAlign: 'right',
  },
  userInfoNames: {
    paddingLeft: 20,
    display: 'flex',
    flexDirection: 'row',
  },
  userNames: {
    fontSize: 18,
    color: '#666666',
  },
});
