import React from 'react'
import { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { getLatestGames } from '../lib/metacritic';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AnimatedGameCard } from './GameCard';
import { SvgComponent } from './Logo';

export function Main () {
  const [games, setGames] = useState([]);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
    });
  }, []);

  return (
    <View style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View
        style={{
          marginBottom: 20,
          marginTop: 10,
          flexDirection: 'row',
          alingItems: 'center',
        }}
      >
        <Logo />
        <Text style={{ color: '#fff', fontSize: 10, fontWeight: 'bold' }}>
          Api Games
        </Text>
      </View>
      {games.length === 0 ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => <AnimatedGameCard game={item} index={index} />}
        />
      )}
    </View>
  )
}
