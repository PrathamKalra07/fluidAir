import { querySalesforce} from './restUtils'

type SalesforceRecord = {
  Id: string;
  [key: string]: any;
};

type userInfo = {
    name : string,
    email : string
}

//method for getting Account's Products
const getAccountDetails = async(accessToken : string , userInfo : userInfo) =>{
     
    let soqlQuery : string = '';
    let accountInfo : SalesforceRecord = {Id :''};

    soqlQuery = `SELECT Id, Name, Primary_Contact_Phone__c, Primary_Contact__r.Name, Primary_Contact_Email__c, Mailing_Street__c, Mailing_City__c, Mailing_State__c, Mailing_ZIP__c, Mailing_Country__c FROM Account WHERE Primary_Contact_Email__c = '${userInfo?.email.replace(/'/g, "\\'")}' LIMIT 1`;

    let accountResult : SalesforceRecord[] =  await querySalesforce(
        accessToken,
        soqlQuery
    )

    console.log('accountResult -> '+accountResult);

    if(accountResult.length > 0) accountInfo = accountResult[0];

    return accountInfo;
}

//method for getting Account's Products
const getAccountProducts = async(accessToken : string  , accountInfo : SalesforceRecord) =>{

    let soqlQuery : string = '';
    let accountProducts : SalesforceRecord[] = [];

    soqlQuery = `SELECT Id, Name, FConnect__Customer__c, FConnect__Customer__r.Name, Short_Description__c, FConnect__Site__r.Name, Account_Status__c, Status_Indicator__c FROM FConnect__Installed_Products__c WHERE FConnect__Customer__c = '${accountInfo?.Id}'`;
    
    accountProducts  = await querySalesforce(
        accessToken,
        soqlQuery
    )

    console.log('accountProducts -> '+accountProducts);

    return accountProducts;
}

//method for getting all Order of related to Account 
const getAllAccountOrder = async(accessToken : string  , accountInfo : SalesforceRecord) =>{

    let soqlQuery : string = '';
    let productOrders : SalesforceRecord[] = [];

    soqlQuery = `SELECT Id, (Select Id from FConnect__Required_Materials__r), Name, Grand_Total__c, Date_Approved__c, FConnect__Site_Name__r.Name, FConnect__Technician_used__r.Name, Parent_Order_Total__c, Last_Event_End_Date__c, Last_Event_Start_Date__c, FConnect__Account__c ,FConnect__Account__r.Name
     FROM FConnect__Service_Order__c WHERE FConnect__Account__c = '${accountInfo.Id}' AND Parent_Order__c = null`;

    productOrders  =  await querySalesforce(
        accessToken,
        soqlQuery
    )

    console.log('productOrders -> '+productOrders);

    return productOrders;
    
}

//method for getting particular Product's Orders
const getProductOrders = async(accessToken : string  , productInfo : SalesforceRecord) =>{

    let soqlQuery : string = '';
    let productOrders : SalesforceRecord[] = [];

    soqlQuery = `SELECT SELECT Id,(Select Id from FConnect__Required_Materials__r) , Name, Grand_Total__c, Date_Approved__c, FConnect__Site_Name__r.Name, FConnect__Technician_used__r.Name, Parent_Order_Total__c, Last_Event_End_Date__c, Last_Event_Start_Date__c, FConnect__Account__c, FConnect__Account__r.Name
     FROM FConnect__Service_Order__c WHERE FConnect__Account__c  = '${productInfo.Id}' AND Parent_Order__c = null`;

    productOrders  =  await querySalesforce(
        accessToken,
        soqlQuery
    )

    console.log('productOrders -> '+productOrders);

    return productOrders;
    
}

//method for getting particular parent order's child Order
const getChildOrders = async(accessToken : string  , parentOrderInfo : SalesforceRecord) =>{

    let soqlQuery : string = '';
    let childOrders : SalesforceRecord[] = [];

    soqlQuery = `SELECT Id, (Select Id from FConnect__Required_Materials__r), Name, Grand_Total__c, Date_Approved__c, FConnect__Site_Name__r.Name, FConnect__Technician_used__r.Name, Parent_Order_Total__c, Last_Event_End_Date__c, Last_Event_Start_Date__c, FConnect__Account__c ,FConnect__Account__r.Name
     FROM FConnect__Service_Order__c WHERE Parent_Order__c  = '${parentOrderInfo.Id}'`;

    childOrders  =  await querySalesforce(
        accessToken,
        soqlQuery
    )

    console.log('childOrders -> '+childOrders);

    return childOrders;
    
}

//method for getting particular child order's order line items
const getOrderLineItems = async(accessToken : string  , childOrderInfo : SalesforceRecord) =>{

    let soqlQuery : string = '';
    let orderLineItems : SalesforceRecord[] = [];

    soqlQuery = `SELECT Id, Name, Item_Description__c, FConnect__Quantity_Neeed__c, Discounted_Unit_Price__c, Extended_Total__c FROM FConnect__Required_Material__c WHERE FConnect__Service_Order__c =  '${childOrderInfo.Id}'`;

    orderLineItems  =  await querySalesforce(
        accessToken,
        soqlQuery
    )

    console.log('orderLineItems -> '+orderLineItems);

    return orderLineItems;
}

export {getAccountDetails , getAllAccountOrder, getAccountProducts , getProductOrders , getChildOrders , getOrderLineItems}