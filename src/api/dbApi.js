import {get, post} from '../utils/httpUtil'

const getProjectUrl = "/project/get"
const listTablesUrl = "/table/list"
const listTableColumnsUrl = "/tableColumn/list"
const delTableColumnUrl = "/tableColumn/del"
const addTableColumnUrl = "/tableColumn/add"
const dbmlTableUrl = "/dbml/table"
const listTableIndexesUrl = "/tableIndex/list"
const getCodeTemplateUrl = "/codeTemplate/get"
const listProjectSqlUrl = "/projectSql/list"
const addProjectSqlUrl = "/projectSql/add"

export function getProject(params) {
    return get(getProjectUrl, params)
}

export function listTables(params) {
    return get(listTablesUrl, params)
}

export function listTableColumns(params) {
    return get(listTableColumnsUrl, params)
}

export function listTableIndexes(params) {
    return get(listTableIndexesUrl, params)
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

export function getCodeTemplate(params) {
    return get(getCodeTemplateUrl, params)

}


export function listProjectSql(params) {
    return get(listProjectSqlUrl, params)
}


export function addProjectSql(params) {
    return post(addProjectSqlUrl, params)
}
