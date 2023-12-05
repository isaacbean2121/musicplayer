import React, { useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Video from 'react-native-video';
import AlbumArt from './src/components/AlbumArt';
import Control from './src/components/Control';
import SongDetails from './src/components/SongDetails';
import { TRACKS } from './src/components/tracks-data';

export default function App() {
  const [pause, setPause] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState(0);

  const currentTrack = TRACKS[selectedTrack];

  const onPlay = () => {
    setPause(false);
  };

  const onPause = () => {
    setPause(true);
  };

  const onNext = () => {
    setSelectedTrack(selectedTrack === TRACKS.length - 1 ? 0 : selectedTrack + 1);
  };

  const onBack = () => {
    setSelectedTrack(selectedTrack === 0 ? TRACKS.length - 1 : selectedTrack - 1);
  };

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        <AlbumArt url={currentTrack.albumArtUrl} />
        <View style={styles.controlsContainer}>
          <SongDetails
            artistName={currentTrack.artist}
            songName={currentTrack.title}
          />
          <Control {...{pause, onPause, onPlay, onNext, onBack}} />
        </View>
        <Video
          source={{ uri: currentTrack.audioUrl }}
          paused={pause}
          audioOnly
          poster={currentTrack.albumArtUrl}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111436',
    flex: 1,
  },
  controlsContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1,
  },
});
