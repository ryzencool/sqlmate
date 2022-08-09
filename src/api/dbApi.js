import {get, post} from '../utils/httpUtil'

const getProjectUrl = "/project/get"
const listTablesUrl = "/table/list"
const getTableUrl = "/table/get"
const listTableColumnsUrl = "/tableColumn/list"
const delTableColumnUrl = "/tableColumn/del"
const addTableColumnUrl = "/tableColumn/add"
const dbmlTableUrl = "/dbml/table"
const listTableIndexesUrl = "/tableIndex/list"
const getCodeTemplateUrl = "/codeTemplate/get"
const listProjectSqlUrl = "/projectSql/list"
const addProjectSqlUrl = "/projectSql/add"
const queryOptimizerUrl = "/queryOptimizer"
const listCodeTemplateUrl = "/codeTemplate/list"
const addCodeTemplateUrl = "/codeTemplate/add"
const updateCodeTemplateFileUrl = "/codeTemplate/update"
const addTemplateFileUrl = "/codeTemplate/file/add"
const listTemplateFileUrl = "/codeTemplate/file/list"
const getTemplateFileUrl = "/codeTemplate/file/get"
const pagePublicProjectUrl = "/project/public/page"
const updateTableUrl = "/table/update"
const createTableUrl = "/table/create"
const listTeamUrl = "/team/list"
const createTeamUrl = "/team/add"
const listTeamUserUrl = "/team/member/list"

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

export function queryOptimizer(params) {
    return post(queryOptimizerUrl, params)
}

export function listCodeTemplate(params) {
    return get(listCodeTemplateUrl, params)
}

export function addCodeTemplate(params) {
    return post(addCodeTemplateUrl, params)
}

export function updateCodeTemplateFile(params) {
    return post(updateCodeTemplateFileUrl, params);
}

export function addTemplateFile(params) {
    return post(addTemplateFileUrl, params)
}


export function listTemplateFile(params) {
    return get(listTemplateFileUrl, params)
}

export function getTemplateFile(params) {
    return get(getTemplateFileUrl, params)
}

export function pagePublicProject(params) {
    return get(pagePublicProjectUrl, params)
}

export function updateTable(params) {
    return post(updateTableUrl, params)
}

export function getTable(params) {
    return get(getTableUrl, params)
}

export function createTable(params) {
    return post(createTableUrl, params)
}

export function listTeam(params) {
    return get(listTeamUrl, params)
}

export function createTeam(params) {
    return post(createTeamUrl, params)
}


export function listTeamUser(params) {
    return get(listTeamUserUrl, params)
}
