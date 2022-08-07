import {useQuery} from "@tanstack/react-query";
import {getCodeTemplate, getProject, listTableColumns, listTableIndexes} from "../../api/dbApi";

export const useGetProject = (params) => useQuery(['project'], () => getProject(params))

export const useGetTable = (params) => {
}


export const useListTable = () => {

}


export const useListColumn = (params = {}, options = {}) => {
    return useQuery(["table"], () => listTableColumns(params), options)

}

export const useListIndex = (params = {}, options = {}) => {
    return useQuery(['tableIndex'], () => listTableIndexes(params), options)
}

export const useGetCodeTemplate = (params = {}, options = {}) => {
    return useQuery(['codeTemplate'], () => getCodeTemplate(params), options);
}
