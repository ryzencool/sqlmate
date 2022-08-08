import {useMutation, useQuery} from "@tanstack/react-query";
import {
    getCodeTemplate,
    getProject, getTemplateFile, listCodeTemplate,
    listProjectSql,
    listTableColumns,
    listTableIndexes,
    listTables, listTemplateFile, pagePublicProject, queryOptimizer
} from "../../api/dbApi";

export const useGetProject = (params) => useQuery(['project'], () => getProject(params))


export const useListColumn = (params = {}, options = {}) => {
    return useQuery(["tableColumns"], () => listTableColumns(params), options)
}

export const useListIndex = (params = {}, options = {}) => {
    return useQuery(['tableIndexes'], () => listTableIndexes(params), options)
}

export const useGetCodeTemplate = (params = {}, options = {}) => {
    return useQuery(['codeTemplate'], () => getCodeTemplate(params), options);
}

export const useListProjectSql = (params = {}, options = {}) => {
    return useQuery(['projectSqls'], () => listProjectSql(params), options)
}

export const useListTables = (params = {}, options = {}) => {
    return useQuery(["projectTables"], () => listTables(params), options)
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
    return useQuery(["publicProjects"], () => pagePublicProject(params), options)
}
