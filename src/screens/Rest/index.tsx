import React from 'react';
import { View, Text, Button } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import {fetchUserSessionId} from '../../api/user.api'
import {querySalesforce} from '../../api/rest'



export default function Rest() {


  const navigation = useNavigation();
  let sessionId : string = ''

type Response = {
  message: string;
  error: boolean;
  data: string;
};


type SalesforceRecord = {
  Id: string;
  [key: string]: any;
};

type SalesforceApiResponse = {
  records: SalesforceRecord[];
  totalSize: number;
  done: boolean;
};

const getAccessToken = async () => {
  const result: Response = await fetchUserSessionId();

  if (result.error) {
    alert('Error occurred: ' + result.message);
    
  } else {
    
        sessionId = result.data;
        console.log('sessionId -> ',sessionId)
    // alert('Result -> ' + JSON.stringify(result));
  }
};


const testCallout = async () => {
  const result : SalesforceApiResponse = await querySalesforce(
    sessionId , process.env.REST_BASE_URL , 'Select id,Name,FConnect__Account__c from FConnect__Service_Order__c limit 5'
  );


  console.log('result query' ,  result);
}



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Rest!</Text>
      <Text style={styles.title}>{process.env.PROD_LOGIN_URL}</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="GET ACCESS TOKEN" onPress={getAccessToken} />
      <Button title="MAKE QUERY" onPress={testCallout} />
    </View>
  );
}
