import {get, post} from '../utils/httpUtil'

const getProjectUrl = "/project/get"
const addProjectUrl = "/project/add"
const listTablesUrl = "/table/list"
const listTablesDetailUrl = "/table/listAll"
const getTableUrl = "/table/get"
const listTableColumnsUrl = "/tableColumn/list"
const delTableColumnUrl = "/tableColumn/del"
const deleteColumnsUrl = "/tableColumn/multi/del"
const addTableColumnUrl = "/tableColumn/add"
const dbmlTableUrl = "/dbml/table"
const listTableIndexesUrl = "/tableIndex/list"
const getCodeTemplateUrl = "/codeTemplate/get"
const listProjectSqlUrl = "/projectSql/list"
const addProjectSqlUrl = "/projectSql/add"
const queryOptimizerUrl = "/queryOptimizer"
const listCodeTemplateUrl = "/codeTemplate/list"
const addCodeTemplateUrl = "/codeTemplate/add"
const updateCodeTemplateUrl = "/codeTemplate/update"
const updateCodeTemplateFileUrl = "/codeTemplate/file/update"
const addTemplateFileUrl = "/codeTemplate/file/add"
const listTemplateFileUrl = "/codeTemplate/file/list"
const getTemplateFileUrl = "/codeTemplate/file/get"
const pagePublicProjectUrl = "/project/public/page"
const updateTableUrl = "/table/update"
const createTableUrl = "/table/create"
const listTeamUrl = "/team/list"
const createTeamUrl = "/team/add"
const listTeamUserUrl = "/team/member/list"
const listFavoriteProjectUrl = "/favoriteProject/list"
const listProjectUrl = "/project/list"
const signUpUserUrl = "/auth/signUp"
const signInUserUrl = "/auth/signIn"
const getUserInfoUrl = "/auth/userInfo"
const listMyProjectUrl = "/project/my/list"
const updateColumnUrl = "/tableColumn/update"
const addIndexUrl = "/tableIndex/add"
const updateIndexUrl = "/tableIndex/update"
const deleteIndexUrl = "/tableIndex/delete"
const executeSqlUrl = "/sql/execute"
const deleteSqlUrl = "/sql/delete"
const updateProjectSqlUrl = "/projectSql/update"
const listTableRelUrl = "/tableRel/list"

export function getProject(params) {
    return get(getProjectUrl, params)
}

export function listTables(params) {
    return get(listTablesUrl, params)
}

export function listTablesDetail(params) {
    return get(listTablesDetailUrl, params)
}

export function listTableRel(params) {
    return get(listTableRelUrl, params)
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

export function listFavoriteProject(params) {

    return get(listFavoriteProjectUrl, params)
}


export function listProject(params) {
    return get(listProjectUrl, params)

}

export function signUpUser(params) {
    return post(signUpUserUrl, params)
}

export function signInUser(params) {
    return post(signInUserUrl, params)
}

export function getUserInfo(params) {
    return get(getUserInfoUrl, params)
}

export function addProject(params) {
    return post(addProjectUrl, params)
}

export function listMyProject(params) {
    return get(listMyProjectUrl, params)
}

export function updateCodeTemplate(params) {
    return post(updateCodeTemplateUrl, params)

}


export function deleteColumns(params) {
    return post(deleteColumnsUrl, params)
}

export function updateColumn(params) {
    return post(updateColumnUrl, params)
}

export function addIndex(params) {
    return post(addIndexUrl, params)
}

export function updateIndex(params) {
    return post(updateIndexUrl, params)
}

export function deleteIndex(params) {
    return post(deleteIndexUrl, params)
}

export function executeSql(params) {
    return post(executeSqlUrl, params)
}

export function deleteProjectSql(params) {
    return post(deleteSqlUrl, params)
}


export function updateProjectSql(params) {
    return post(updateProjectSqlUrl, params)
}
