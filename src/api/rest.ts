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
  const queryEndpoint = `${instanceUrl}/services/data/v56.0/query?q=${encodeURIComponent(soqlQuery)}`;

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

