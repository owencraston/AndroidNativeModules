/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useMemo} from 'react';
import {
  NativeEventEmitter,
  SafeAreaView,
  useColorScheme,
  NativeModules,
  Button,
  Text,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const {HelloModule} = NativeModules;
  const isDarkMode = useColorScheme() === 'dark';
  const [moduleState, setModuleState] = useState(null);
  const EVENT_RESULT = 'EVENT_RESULT';

  const nativeEmitter = useMemo(
    () => new NativeEventEmitter(HelloModule),
    [HelloModule],
  );

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    nativeEmitter.addListener(EVENT_RESULT, result => {
      setModuleState(result.data);
    });
    return () => {
      nativeEmitter.removeAllListeners(EVENT_RESULT);
    };
  }, [nativeEmitter]);

  function onPress() {
    HelloModule.helloWorld();
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <Button title="Trigger native module" onPress={onPress} />
      {moduleState ? <Text>{`Result of module ${moduleState}`}</Text> : null}
      <Button title="Reset state" onPress={() => setModuleState(null)} />
    </SafeAreaView>
  );
};

export default App;
