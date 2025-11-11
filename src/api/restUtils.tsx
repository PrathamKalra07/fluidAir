import * as xml2JS from 'react-native-xml2js';
import axios from 'axios';

type SalesforceRecord = {
  Id: string;
  [key: string]: any;
};

type SalesforceApiResponse = {
  records: SalesforceRecord[];
  totalSize: number;
  done: boolean;
};

type response = {
  message: string;
  error: boolean;
  data: string;
};

type userInfo = {
    id : string
    name : string,
    email : string
}

//to fetch session for salesforce callout
const fetchUserSessionId = async () : Promise<response> => {
  const endpoint = `${process.env.PROD_LOGIN_URL}/services/Soap/u/57.0`;

  console.log('endpoint', endpoint);

  const password =`${process.env.FLUIDAIR_PASSWORD}` + `${process.env.SECURITY_TOKEN}`;
  let parseString = xml2JS.parseString;
  let stripNS = xml2JS.processors.stripPrefix;
  const options = {
    tagNameProcessors: [stripNS],
    explicitArray: false,
  };

  console.log( 'password' ,password)
  
  const axiosConfig = {
    headers: {
      SOAPAction: "''",
      'Content-Type': 'text/xml',
    },
  };
  
  let xmlBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:partner.soap.sforce.com">
    <soapenv:Body>
      <urn:login>
        <urn:username>${process.env.FLUIDAIR_USERNAME}</urn:username>
        <urn:password>${password}</urn:password>
      </urn:login>
    </soapenv:Body>
  </soapenv:Envelope>`;

    console.log('xmlBody' ,xmlBody)

  const authRes = await axios.post(endpoint, xmlBody, axiosConfig);
  return new Promise((resolve, reject) => {
    
    parseString(authRes.data, options, function (err: any, result: any) {
      if (err) {
        console.log('err => '+ err.message);
        return reject({
          message: err.message,
          error: true,
          data: null,
        });

      } else {
        console.log('success');
         
        const sessionId =
          result.Envelope.Body.loginResponse.result.sessionId ?? '';
           console.log('sessionId ', sessionId);
           
        return resolve({
          message: 'OK',
          error: false,
          data: sessionId,
        });
      }
    });
  });
};

//to make soql query to salesforce
const querySalesforce = async (
  accessToken: string,
  soqlQuery: string
): Promise<SalesforceRecord[]> => {
  
  soqlQuery = encodeURIComponent(soqlQuery).replace(/%20/g, '+');
  // const queryEndpoint = `${process.env.REST_BASE_URL}/services/data/v59.0/query?q=${soqlQuery}`;
  const queryEndpoint = `https://dg0000000kpsxmay.my.salesforce.com/services/data/v56.0/query?q=${soqlQuery}`;
  console.log('queryEndpoint ->> '+queryEndpoint)
  console.log('soqlQuery ->> '+soqlQuery)
  console.log('accessToken ->> '+accessToken)

  return axios
    .get<SalesforceApiResponse>(queryEndpoint, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.data.records)
    .catch(error => {
      console.log('error -? '+error)
      const message = error.response
        ? `Salesforce query failed: ${error.response.status} ${error.response.statusText}`
        : error.message;
      return Promise.reject(new Error(message));
    });
}


export {fetchUserSessionId , querySalesforce};