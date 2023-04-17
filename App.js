import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList,
  Pressable,
} from 'react-native';
import ApiCall from './components/apicall';

export default function App() {
  const [value, setValue] = useState('');
  const [listOfNotes, setListOfNotes] = useState([]);
  function handleOnChangeText(getEnteredText) {
    setValue(getEnteredText);
  }

  function handleOnPressButton() {
    console.log(value);
    setListOfNotes((currentNotes) => [...currentNotes, value]);
    setValue('');
  }

  const handleRemoveItem = (getCurrentIndex) => {
    console.log('Item Pressed Here');
    let copyListOfNotes = [...listOfNotes];
    copyListOfNotes = copyListOfNotes.filter(
      (_, index) => index !== getCurrentIndex
    );
    setListOfNotes(copyListOfNotes);
  };

  return (
    <View style={{ padding: 60, paddingHorizontal: 15, flex: 1 }}>
      {/* to render input along with button */}

      <View style={styles.inputContainer}>
        <TextInput
          onChangeText={handleOnChangeText}
          style={styles.input}
          placeholder="Add Your Note Here"
          value={value}
        />
        <Button onPress={handleOnPressButton} color={'#000'} title="Add Note" />
      </View>

      {/* to render input along with button */}

      {/* to render all notes that we created */}

      <View style={styles.listContainer}>
        <FlatList
          data={listOfNotes}
          renderItem={(item, i) => (
            <Pressable onPress={() => handleRemoveItem(item.index)}>
              <Text key={`item${i}`} style={styles.listItem}>
                {item.item}
              </Text>
            </Pressable>
          )}
        />
        {/* <Text>Show Lists Here !</Text> */}
        {/* {listOfNotes.map((list, i) => (
          <Text key={`item${i}`} style={styles.listItem}>
            {list}
          </Text>
        ))} */}
      </View>

      {/* to render all notes that we created */}

      {/* Our Api Component */}
      <View style={styles.apiContainer}>
        <ApiCall />
      </View>
      {/* Our Api Component */}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    paddingBottom: 30,
    borderBottomWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    flex: 1,
  },
  listContainer: {
    paddingTop: 30,
    flex: 2,
  },
  listItem: {
    borderRadius: 5,
    borderColor: 'red',
    backgroundColor: '#000',
    padding: 20,
    marginBottom: 20,
    color: 'white',
    fontSize: 20,
  },
  apiContainer: {
    flex: 2,
  },
});
