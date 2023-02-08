import { ZOHO } from '../vendor/ZSDK';

export async function invokeDummyFunction (id){
    return await ZOHO.CRM.FUNCTIONS.execute('test_demo', {id : id}).then((data) => {
        return data
    }).catch((error) => {
        console.log(error);
    }
    );
}

export async function getContacts() {
    return await ZOHO.CRM.FUNCTIONS.execute('groups_contact', {}).then((data) => { 
        return data
        }).catch((error) => {
            console.log(error);
        }
        );
}