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

export function querySalesforce(
  accessToken: string,
  instanceUrl: string,
  soqlQuery: string
): Promise<SalesforceRecord[]> {


  function encodeSOQL(soqlQuery: string): string {
  return encodeURIComponent(soqlQuery).replace(/%20/g, '+');
}

  const queryEndpoint = `${instanceUrl}/services/data/v56.0/query?q=${encodeSOQL(soqlQuery)}`;

  console.log('queryEndpoint ->> '+queryEndpoint)
  console.log('soqlQuery ->> '+encodeSOQL(soqlQuery))
  console.log('accessToken ->> '+accessToken)

  return axios
    .get<SalesforceApiResponse>(queryEndpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.data.records)
    .catch(error => {
      const message = error.response
        ? `Salesforce query failed: ${error.response.status} ${error.response.statusText}`
        : error.message;
      return Promise.reject(new Error(message));
    });
}

