import { querySalesforce} from './restUtils'

type SalesforceRecord = {
  Id: string;
  [key: string]: any;
};

// type SalesforceApiResponse = {
//   records: SalesforceRecord[];
//   totalSize: number;
//   done: boolean;
// };

type userInfo = {
    name : string,
    email : string
}

//method for getting Account's Products
const getAccountDetails = async(accessToken : string , userInfo : userInfo) =>{
     
    let soqlQuery : string = '';
    let accountInfo : SalesforceRecord = {Id :''};

    soqlQuery = "SELECT Id, Name , Phone ,Primary_Contact__r.Name, Primary_Contact_Email__c, Mailing_Street__c , Mailing_City__c , Mailing_State__c , Mailing_ZIP__c , Mailing_Country__c FROM Account WHERE Primary_Contact_Email__c = '" + userInfo?.email.replace(/'/g, "\\'") + "' LIMIT 1";
    // soqlQuery = 'SELECT Id, Name FROM ACCOUNT  LIMIT 5';

    let accountResult : SalesforceRecord[] =  await querySalesforce(
        accessToken,
        soqlQuery
    )

    console.log('accountResult -> '+accountResult);

    if(accountResult.length > 0) accountInfo = accountResult[0];

    console.log('accountInfo ab -> '+accountInfo);

    return accountInfo;
}

//method for getting Account's Products
const getAccountProducts = async(accessToken : string  , accountInfo : SalesforceRecord) =>{

    let soqlQuery : string = '';
    let accountProducts : SalesforceRecord[] = [];

    soqlQuery = "SELECT Id ,Name, FConnect__Account__c ,FConnect__Account__r.Name  FROM FConnect__Service_Order__c WHERE FConnect__Account__c  = " + accountInfo?.Id.replace(/'/g, "\\'") + "' LIMIT 10" ;
    // soqlQuery = `SELECT Id, Name, FConnect__Account__c, FConnect__Account__r.Name , Short_Description__c , Site_Name__c , Account_Status__c FROM FConnect__Service_Order__c WHERE FConnect__Account__c = "${accountInfo?.Id.replace(/'/g, "\\'")}" LIMIT 10`;
            

        console.log('ok 1 query : ',soqlQuery );
    accountProducts  = await querySalesforce(
        accessToken,
        soqlQuery
    )
        console.log('ok 2')

    console.log('accountProducts -> '+accountProducts);

    return accountProducts;
    
}

//method for getting particular Product Orders
const getProductOrders = async(accessToken : string  , productInfo : SalesforceRecord) =>{

    let soqlQuery : string = '';
    let accountProducts : SalesforceRecord[] = [];

    soqlQuery = 'SELECT ID,Name, FConnect__Account__c ,FConnect__Account__r.Name  FROM FConnect__Service_Order__c WHERE FConnect__Account__c  = ' + accountInfo.Id;


    accountProducts  =  await querySalesforce(
        accessToken,
        soqlQuery
    )


    console.log('accountProducts -> '+accountProducts);

    return accountProducts;
    
}

//method for getting particular parent order's child Order
const getChildOrders = async(accessToken : string  , parentOrderInfo : SalesforceRecord) =>{

    let soqlQuery : string = '';
    let accountProducts : SalesforceRecord[] = [];

    soqlQuery = 'SELECT ID,Name, FConnect__Account__c ,FConnect__Account__r.Name  FROM FConnect__Service_Order__c WHERE FConnect__Account__c  = ' + accountInfo.Id;

    accountProducts  =  await querySalesforce(
        accessToken,
        soqlQuery
    )

    console.log('accountProducts -> '+accountProducts);

    return accountProducts;
    
}

//method for getting particular child order's order line items
const getOrderLineItems = async(accessToken : string  , childOrderInfo : SalesforceRecord) =>{

    let soqlQuery : string = '';
    let accountProducts : SalesforceRecord[] = [];

    soqlQuery = 'SELECT ID,Name, FConnect__Account__c ,FConnect__Account__r.Name  FROM FConnect__Service_Order__c WHERE FConnect__Account__c  = ' + accountInfo.Id;

    accountProducts  =  await querySalesforce(
        accessToken,
        soqlQuery
    )

    console.log('accountProducts -> '+accountProducts);

    return accountProducts;
    
}


export {getAccountDetails , getAccountProducts , getProductOrders , getChildOrders , getOrderLineItems}