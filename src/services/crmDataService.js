import { ZOHO } from '../vendor/ZSDK';

export async function invokeDummyFunction (id){
    return await ZOHO.CRM.FUNCTIONS.execute('test_demo', {id : id}).then((data) => {
        return data
    }).catch((error) => {
        console.log(error);
    }
    );
}

export async function getTableRecords (id) {
    return await ZOHO.CRM.FUNCTIONS.execute('trans_key_date', {id : id}).then((data) => {
            return data
        }).catch((error) => {
            console.log(error);
        }
        );
}

export async function postRecord(data){
    
    return await ZOHO.CRM.FUNCTIONS.execute('push_data_crm', { data: data}).then((data) => {
            return data
        }).catch((error) => {
            console.log(error);
        }
        );
}

export async function closeWidget() {
    return await ZOHO.CRM.UI.Popup.close();
}

export async function closeWidgetOnSave() {
    return await ZOHO.CRM.UI.Popup.closeReload();
}

export async function completeRecord(data) {
  return await ZOHO.CRM.FUNCTIONS.execute("update_complete", { data: data })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function updateDate(data) {
    return await ZOHO.CRM.FUNCTIONS.execute("update_key_Date", { data: data })
        .then((data) => {
        return data;
        })
        .catch((error) => {
        console.log(error);
        });
}

export async function updateLastNote(data){
    return await ZOHO.CRM.FUNCTIONS.execute("add_note", { data: data })
        .then((data) => {
        return data;
        })
        .catch((error) => {
        console.log(error);
        });
}

export async function getLastNotes(data){
    return await ZOHO.CRM.FUNCTIONS.execute("get_last_notes", { data: data })
        .then((data) => {
        return data;
        })
        .catch((error) => {
        console.log(error);
        });
}