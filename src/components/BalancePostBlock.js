import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList, TouchableOpacity} from 'react-native';
import {type_color, type_font, type_id, url} from './Constants';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';
import VoteItemBalance from './VoteItemBalance';
import Profile from './Profile';
import {showToast, toastType} from './ToastManager';
import Icon from 'react-native-vector-icons/Feather';

function BalancePostBlock({
  postId,
  posterId,
  postType = 'balance',
  posterImage,
  posterUuid,
  timeBefore,
  userCount,
  storyText,
  selection, //'selectionId', 'text'
  voteActive = true,
  initResult = null,
  linkVer = false,
  showImage = true,
}) {
  const [uuid] = useRecoilState(uuidState);
  const [selected, setSelected] = useState(null);
  const [userCounts, setUserCounts] = useState(userCount);
  const [resultJson, setResultJson] = useState(null);

  const setting = () => {
    fetch(url.resultLoad + postId)
      .then(res => res.json())
      .then(json => {
        setResultJson(json);
      });
  };

  const onPressVote = sid => {
    if (uuid == null) {
      showToast(toastType.error, '투표 참여는 로그인 후 가능합니다.');
    } else {
      if (selected == sid) {
        //같은거 또 눌렀으면 -> 취소
        votePost(null);
        setUserCounts(userCounts - 1);
      } else {
        if (selected == null) {
          //투표 새롭게 참여
          setUserCounts(userCounts + 1);
        }
        votePost(sid);
      }
    }
  };

  const settingSel = () => {
    fetch(url.getSelection + uuid + '/' + postId)
      .then(res => res.json())
      .then(json => {
        setSelected(json.selection);
      });
  };

  const votePost = sid => {
    return fetch(url.voteSelect, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UUID: uuid,
        poll_id: postId,
        sid: sid,
      }),
    })
      .then(function (response) {
        if (response.ok) {
          setSelected(sid);
        } else {
          throw new Error('Network response was not ok.');
        }
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ',
          error.message,
        );
      });
  };

  function getPercent(initResult, selectionId) {
    if (initResult == null || selected == null) {
      return null;
    } else {
      const result = initResult.selectionResult;
      const index = result.findIndex(v => v.selectionId === selectionId);
      if (index == -1) {
        return 0;
      } else {
        return Math.floor(result[index]?.percent);
      }
    }
  }

  useEffect(() => {
    if (uuid != null) {
      settingSel();
    }
  }, [uuid, postId]);

  useEffect(() => {
    if (selected != null) {
      setting();
    }
  }, [selected]);

  var text;
  timeBefore >= 1440
    ? (text = Math.floor(timeBefore / 1440) + '일 전')
    : timeBefore >= 60
    ? (text = Math.floor(timeBefore / 60) + '시간 전')
    : (text = timeBefore + '분 전');

  return (
    <>
      {linkVer == false && (
        <>
          <View style={styles.dataBlock}>
            <Text
              style={[
                styles.dataText,
                {backgroundColor: type_color[type_id[postType]]},
              ]}>
              {text}
            </Text>
            <Text
              style={[
                styles.dataText,
                {backgroundColor: type_color[type_id[postType]]},
              ]}>
              {userCounts}명 투표
            </Text>
            <View style={{flex: 1}} />
          </View>
        </>
      )}
      {linkVer == false ? (
        <View style={{alignItems: 'center'}}>
          <Text style={styles.storyText}>{storyText}</Text>
        </View>
      ) : (
        <View>
          <Text style={[styles.storyText, {fontFamily: type_font.appleM}]}>
            {storyText}
          </Text>
        </View>
      )}

      <View style={styles.list}>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          data={selection}
          renderItem={({item}) =>
            voteActive ? (
              <VoteItemBalance
                postId={postId}
                selectionId={item.selectionId}
                text={item.text}
                onPressVote={onPressVote}
                image={item.image}
                linkVer={linkVer}
                selected={selected}
                percent={getPercent(resultJson, item.selectionId)}
                showImage={showImage}
              />
            ) : initResult == null ? (
              <VoteItemBalance
                postId={postId}
                type={postType}
                selectionId={item.selectionId}
                onPressVote={onPressVote}
                text={item.text}
                image={item.image}
                resultVer={true}
                percent={getPercent(resultJson, item.selectionId)}
                showImage={showImage}
              />
            ) : (
              <VoteItemBalance
                postId={postId}
                type={postType}
                selectionId={item.selectionId}
                onPressVote={onPressVote}
                text={item.text}
                image={item.image}
                resultVer={true}
                percent={getPercent(initResult, item.selectionId)}
                showImage={showImage}
              />
            )
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  dataBlock: {
    flexDirection: 'row',
  },
  dataText: {
    paddingHorizontal: 7,
    paddingVertical: 1,
    height: 16,
    borderRadius: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 12,
    fontSize: 10,
    fontFamily: type_font.appleB,
    color: 'white',
  },
  storyText: {
    marginHorizontal: 3,
    marginTop: 10,
    marginBottom: 10,
    fontFamily: type_font.appleM,
    fontSize: 14,
    color: 'black',
  },
  list: {
    alignItems: 'center',
    marginBottom: 17,
    marginLeft: -5,
  },
});

export default BalancePostBlock;
