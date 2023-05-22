import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useInfiniteQuery} from '@tanstack/react-query';
import {PeopleService} from '@geekseat/technical-test/services';
import {PeopleCard} from '@geekseat/technical-test/components';

export default function Home(): JSX.Element {
  const {isInitialLoading, error, data, fetchNextPage, isFetchingNextPage} =
    useInfiniteQuery({
      queryKey: ['people'],
      queryFn: ({pageParam = 1}) =>
        PeopleService.paginatePeople({query: {page: `${pageParam}`}}),
      getNextPageParam: lastPage =>
        lastPage.next &&
        new URLSearchParams(new URL(lastPage.next).search).get('page'),
    });

  const loadMore = useCallback(() => {
    if (
      data &&
      data.pages.reduce((prev, curr) => prev + curr.results.length, 0) <
        data.pages[data.pages.length - 1].count
    ) {
      fetchNextPage();
    }
  }, [data, fetchNextPage]);

  if (isInitialLoading) {
    return <ActivityIndicator style={styles.singleItem} size="large" />;
  } else if (!data && error) {
    return <Text style={styles.singleItem}>{(error as Error).message}</Text>;
  } else {
    return (
      <FlatList
        testID="list"
        data={data?.pages?.flatMap(page => page.results)}
        renderItem={({index, item}) => (
          <View style={index === 0 && styles.firstItem}>
            <PeopleCard name={item.name} />
          </View>
        )}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator style={styles.singleItem} size="large" />
          ) : (
            <View />
          )
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.2}
      />
    );
  }
}

const styles = StyleSheet.create({
  singleItem: {
    margin: 16,
  },
  firstItem: {
    marginTop: 16,
  },
});
