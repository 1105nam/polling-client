import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import {type_color, type_font, type_id, url} from './Constants';

function VoteItem({
  text,
  postId,
  selectionId,
  type,
  onPressVote,
  image,
  resultVer = false,
  percent = null,
  selected = null,
  showImage = true,
}) {
  const loaderValue = useRef(new Animated.Value(0)).current;

  const load = () => {
    Animated.timing(loaderValue, {
      toValue: percent,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const width = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    load();
  }, [percent]);

  return (
    <View style={[styles.block, showImage && image != null && {height: 92}]}>
      <>
        {showImage && image != null && (
          <Image source={{uri: image}} style={styles.image} />
        )}
        <TouchableOpacity
          disabled={resultVer}
          style={
            (image != null && {height: 92}, {flex: 1, flexDirection: 'row'})
          }
          onPress={() => onPressVote(selectionId)}>
          <Animated.View
            style={[
              {
                backgroundColor: type_color.lightGray,
                opacity: 0.6,
                width,
                borderWidth: 0,
                borderRadius: 10,
              },
              showImage &&
                image != null && {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              !resultVer &&
                selected == selectionId && {
                  backgroundColor: type_color[type_id[type]],
                  opacity: 0.6,
                },
            ]}
          />
          <Text
            style={[
              styles.text,
              {paddingLeft: 2, position: 'absolute', alignSelf: 'center'},
            ]}>
            {text}
          </Text>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
              justifyContent: 'center',
            }}>
            {percent != null && (
              <Text
                style={[styles.text, {position: 'absolute', paddingRight: 8}]}>
                {percent}%
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    marginVertical: 3,
    //borderWidth: 0.9,
    //borderColor: type_color.gray,
    backgroundColor: type_color.lightBackground,
    //opacity: 0.8,
    height: 31,
    borderRadius: 10,
    flexDirection: 'row',
  },
  text: {
    margin: 5,
    fontSize: 14,
    fontFamily: type_font.appleL,
    color: 'black',
  },
  image: {
    width: 90,
    height: 92,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
});

export default VoteItem;
