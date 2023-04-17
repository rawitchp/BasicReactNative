import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

export default function ApiCall() {
  // loading state
  const [loading, setLoading] = useState(false);
  //data state
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    //maintain our loading state
    setLoading(true);
    const getDataFromApi = async () => {
      const apiRes = await fetch('https://dummyjson.com/users').then((res) =>
        res.json()
      );

      if (apiRes) {
        setApiData(
          apiRes.users.map(
            (userItem) =>
              `${userItem.firstName} ${userItem.lastName} ${userItem.age}`
          )
        );
        setLoading(false);
      }
    };
    getDataFromApi();
  }, []);

//   console.log(loading, 'loading');
  if (loading) {
    return <ActivityIndicator color={'red'} size="large" />;
  }
  return (
    <View>
      <Text>Api Data</Text>
      <View>
        <FlatList
          data={apiData}
          renderItem={(itemData) => <Text>{itemData.item}</Text>}
        />
      </View>
    </View>
  );
}
