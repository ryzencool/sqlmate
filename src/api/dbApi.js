import {get, post} from '../utils/httpUtil'


const listTablesUrl = "/table/list"
const listTableColumnsUrl = "/tableColumn/list"
const delTableColumnUrl = "/tableColumn/del"
const addTableColumnUrl = "/tableColumn/add"
const dbmlTableUrl = "/dbml/table"

export function listTables(params) {
    return get(listTablesUrl, params)
}

export function listTableColumns(params) {
    return get(listTableColumnsUrl, params)
}

export function delColumn(params) {
    console.log("删除的params:", params)
    return post(delTableColumnUrl, params)
}


export function addColumn(params) {
    return post(addTableColumnUrl, params)
}



export function dbmlTable(params) {
    return get(dbmlTableUrl, params)
}
