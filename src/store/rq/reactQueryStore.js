import {useMutation, useQuery} from "@tanstack/react-query";
import {
    dbmlTable,
    getCodeTemplate,
    getProject, getTable, getTemplateFile, listCodeTemplate, listFavoriteProject, listProject,
    listProjectSql,
    listTableColumns,
    listTableIndexes,
    listTables, listTeam, listTeamUser, listTemplateFile, pagePublicProject, queryOptimizer
} from "../../api/dbApi";

export const useGetProject = (params) => useQuery(['project'], () => getProject(params))


export const useListColumn = (search, options = {}) => {
    return useQuery(["tableColumns", search], () => listTableColumns(search), options)
}

export const useListIndex = (search , options = {}) => {
    return useQuery(['tableIndexes', search], () => listTableIndexes(search), options)
}

export const useGetCodeTemplate = (params = {}, options = {}) => {
    return useQuery(['codeTemplate'], () => getCodeTemplate(params), options);
}

export const useListProjectSql = (params = {}, options = {}) => {
    return useQuery(['projectSqls'], () => listProjectSql(params), options)
}

export const useListTables = (search, options = {}) => {
    return useQuery(["projectTables", search], () => listTables(search), {
        enabled: !!search
    })
}


export const useQueryOptimizer = (params = {}, options = {}) => {
    return useQuery(["queryOptimizer"], () => queryOptimizer(params), options)
}


export const useListCodeTemplate = (params = {}, options = {}) => {
    return useQuery(['codeTemplates'], () => listCodeTemplate(params),options)
}

export const useListTemplateFile = (params = {}, options = {} ) => {
    return useQuery(['templateFiles'], () => listTemplateFile(params), options)
}


export const useGetTemplateFile = (params = {}, options = {}) => {
    return useQuery(['templateFile'], () => getTemplateFile(params), options)
}

export const usePagePublicProject = (params = {}, options= {}) => {
    console.log("进入公共版")
    return useQuery(["publicProjects"], () => pagePublicProject(params), options)
}

export const useGetTable = (search , options = {}) => {
    return useQuery(['table', search], () => getTable(search), options)
}


export const useListTeam = (params = {}, options= {}) => {
    return useQuery(['teams'], () => listTeam(params), options)
}

export const useListTeamUser = (search, options= {}) => {
    return useQuery(['teamUsers', search], () => listTeamUser(search), options)
}


export const useGetDBML = (search, options={}) => {
    return useQuery(['dbml', search], () => dbmlTable(search), options)
}


export const useListFavoriteProject = (search , options = {}) => {
    return useQuery(['favoriteProjects', search], () => listFavoriteProject(search), options)
}

export const useListProject = (search, options = {}) => {
    return useQuery(['projects', search], () => listProject(search), options)
}
