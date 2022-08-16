import React, {useState} from 'react'
import {useListColumn, useListTables} from "../store/rq/reactQueryStore";
import FormSelect from "./FormSelect";


export default function FormTableAndColumnSelectBox({nameTable, nameColumn, control, watch, index}) {


    const tables = useListTables({})


    const [search, setSearch] = useState()

    useListColumn(search, {
        enabled: !!search,
        onSuccess: (data) => {
            setColumnData(data.data.data.map(it => (
                {
                    key: it.id,
                    value: it.name
                }
            )))
        }
    })

    const [columnData, setColumnData] = useState([])

    React.useEffect(() => {
        const subscription = watch((value) => setSearch(
            {tableId: value.relationShip[index].tableId}));
        return () => subscription.unsubscribe();
    }, [watch]);


    return <>
        <FormSelect name={nameTable} label={"关联表"} control={control}
                    choices={!tables.isLoading && tables.data.data.data.map(it => ({
                        key: it.id,
                        value: it.name
                    }))}/>
        <FormSelect name={nameColumn} label={"关联表"} control={control}
                    choices={columnData}/>
    </>

}
