import { ZOHO } from '../vendor/ZSDK';

export async function invokeDummyFunction (id){
    return await ZOHO.CRM.FUNCTIONS.execute('test_demo', {id : id}).then((data) => {
        return data
    }).catch((error) => {
        console.log(error);
    }
    );
}

export async function getContacts(object) {
    return await ZOHO.CRM.FUNCTIONS.execute('groups_contact', {data : object}).then((data) => { 
        return data
        }).catch((error) => {
            console.log(error);
        }
        );
}

export async function updateGroups(data) {
    return await ZOHO.CRM.FUNCTIONS.execute('update_groups', {data : data}).then((data) => { 
        return data
        }).catch((error) => {
            console.log(error);
        }
        );
}

export async function createNewgroup (group) {
    return await ZOHO.CRM.FUNCTIONS.execute('create_groups', {data: group}).then((data) => {
        return data
        }).catch((error) => {
            console.log(error);
        }
        );
}

export async function getGroups(email) {
    return await ZOHO.CRM.FUNCTIONS.execute('get_groups', {data : email}).then((data) => { 
        return data
        }).catch((error) => {
            console.log(error);
        }
        );
}