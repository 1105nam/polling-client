import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {navigation_id, type_color, type_font, type_id, url} from './Constants';
import VoteItem from './VoteItem';
import {useRecoilState} from 'recoil';
import {uuidState} from '../atoms/auth';
import {showToast, toastType} from './ToastManager';

function PollingPostBlock({
  navigation,
  postId,
  postType,
  timeBefore,
  userCount,
  storyText,
  selection, //'selectionId', 'text', 'image'
  voteActive = true,
  initResult = null,
}) {
  const [isVoted, setVoted] = useState(false);
  const [uuid] = useRecoilState(uuidState);
  const [selected, setSelected] = useState(null);
  const [userCounts, setUserCounts] = useState(userCount);

  const onPressVote = sid => {
    console.log('서버 요청보냄 GetResult');

    if (uuid == null) {
      showToast(toastType.error, '투표 참여는 로그인 후 가능합니다.');
    } else {
      if (selected == sid) {
        //같은거 또 눌렀으면 -> 취소
        setSelected(null);
        votePost(null);
        setUserCounts(userCounts - 1);
      } else {
        if (selected == null) {
          //투표 새롭게 참여
          setUserCounts(userCounts + 1);
        }
        setSelected(sid);
        votePost(sid);
      }
      setVoted(!isVoted);
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
          //return response.json();
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
    const result = initResult.selectionResult;
    const index = result.findIndex(v => v.selectionId === selectionId);
    if (index == -1) {
      return 0;
    } else {
      return Math.floor(result[index]?.percent);
    }
  }

  useEffect(() => {
    if (uuid != null) {
      settingSel();
    }
  }, [uuid]);

  var text;
  timeBefore >= 1440
    ? (text = Math.floor(timeBefore / 1440) + '일 전')
    : timeBefore >= 60
    ? (text = Math.floor(timeBefore / 60) + '시간 전')
    : (text = timeBefore + '분 전');

  return (
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
      </View>
      <Text style={styles.storyText}>{storyText}</Text>
      <View style={styles.list}>
        <FlatList
          data={selection}
          renderItem={({item}) =>
            voteActive ? (
              //기본
              <VoteItem
                isVoted={isVoted}
                postId={postId}
                selectionId={item.selectionId}
                type={postType}
                text={item.text}
                onPressVote={onPressVote}
                image={item.image}
                selected={selected}
              />
            ) : initResult == null ? (
              //투표 통계 기본 결과
              <VoteItem
                isVoted={isVoted}
                postId={postId}
                type={postType}
                selectionId={item.selectionId}
                text={item.text}
                image={item.image}
                resultVer={true}
                selected={selected}
                initPercent={null}
              />
            ) : (
              //투표 통계 카테고리 선택 후 결과
              <VoteItem
                isVoted={isVoted}
                postId={postId}
                type={postType}
                selectionId={item.selectionId}
                text={item.text}
                image={item.image}
                resultVer={true}
                initPercent={getPercent(initResult, item.selectionId)}
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
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 12,
    fontSize: 10,
    fontFamily: type_font.appleB,
    color: 'white',
  },
  storyText: {
    marginHorizontal: 3,
    marginVertical: 5,
    marginBottom: 10,
    fontFamily: type_font.appleL,
    fontSize: 14,
    color: 'black',
  },
  list: {
    marginTop: 5,
    marginBottom: 12,
  },
});

export default PollingPostBlock;
