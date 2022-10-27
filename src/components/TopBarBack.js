import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {type_color, type_font, type_text} from './Constants';
import Icon from 'react-native-vector-icons/Feather';

function TopBarBack({navigation, type, optionalTitle = ''}) {
  return (
    <>
      <View style={[styles.frame, {backgroundColor: type_color[type]}]}>
        <View
          style={[
            styles.block,
            {
              backgroundColor: type_color[type],
            },
          ]}>
          <Image source={type_logo[type]} style={styles.image} />
          {optionalTitle == '' ? (
            <Text style={styles.titleText}>{type_text[type]}</Text>
          ) : (
            <Text style={styles.titleText}>{optionalTitle}</Text>
          )}
        </View>
        <View style={styles.empty} />
        <TouchableOpacity
          style={{alignItems: 'flex-end', marginHorizontal: 7, marginTop: 5}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="x" color={'black'} size={30} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  frame: {
    paddingTop: 25,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  block: {
    flexDirection: 'row',
  },
  empty: {
    flex: 1,
  },
  titleText: {
    marginTop: 5,
    fontSize: 26,
    fontFamily: type_font.jua,
    color: 'black',
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 6,
  },
});

const type_logo = {
  polling: require('../../assets/images/logo_polling.png'),
  balance: require('../../assets/images/logo_balance.png'),
  battle: require('../../assets/images/logo_battle.png'),
  makePoll: require('../../assets/images/logo_polling.png'),
};

export default TopBarBack;