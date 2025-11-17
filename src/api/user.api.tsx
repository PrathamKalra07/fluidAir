import * as xml2JS from 'react-native-xml2js';
import axios from 'axios';
import Config from 'react-native-config';


const fetchUserSessionId = async () => {
  const endpoint = `${Config.PROD_LOGIN_URL}/services/Soap/u/57.0`;

  console.log('endpoint', endpoint);

  const password =
    `${Config.FLUIDAIR_PASSWORD}` + `${Config.SECURITY_TOKEN}`;
  let parseString = xml2JS.parseString;
  let stripNS = xml2JS.processors.stripPrefix;
  const options = {
    tagNameProcessors: [stripNS],
    explicitArray: false,
  };

  
  console.log('password' ,password)
  const axiosConfig = {
    headers: {
      SOAPAction: "''",
      'Content-Type': 'text/xml',
    },
  };
  
  let xmlBody = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:partner.soap.sforce.com">
    <soapenv:Body>
      <urn:login>
        <urn:username>${Config.FLUIDAIR_USERNAME}</urn:username>
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

export {fetchUserSessionId};
