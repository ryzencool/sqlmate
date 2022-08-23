import Button from "@mui/material/Button";
import React, {useRef} from 'react'
import {Menu, MenuItem} from "@mui/material";
import {exporter, importer} from "@dbml/core";
import {useAtom} from "jotai";
import {activeProjectAtom} from "../store/projectStore";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {importProjectDbml} from "../api/dbApi";

export default function ZMenu() {

    const [project,setProject] = useAtom(activeProjectAtom)


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const fileInput = useRef()
    const showFile = (e) => {
        e.preventDefault();
        console.log("气死我了")
        const reader = new FileReader();
        reader.onload = (e) => {
            const text = e.target.result;
            console.log(text.toString())
            let dbml = importer.import(text.toString(), 'postgres')
            console.log(dbml)
            let sqlJson = exporter.export(dbml, 'json');
            console.log(sqlJson)
            importDbmlMutation.mutate({
                projectId: project.id,
                dbmlJson: sqlJson
            })
        };
        reader.readAsText(e.target.files[0]);
        handleClose()
    };

    const selectFile = () => {
        fileInput.current.click()
    }

    const queryClient = useQueryClient()
    const importDbmlMutation = useMutation(importProjectDbml, {
        onSuccess: () => {
            queryClient.invalidateQueries(['projectTables'])
        }
    })

    const handleSyncDatabase = () => {
        // 获取所有的表

    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                菜单
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => {
                    selectFile();
                    // handleClose();
                }}>导入SQL</MenuItem>
                <input type={'file'} style={{display: "none"}} ref={fileInput} onChange={showFile}/>

                <MenuItem onClick={handleClose}>导出SQL</MenuItem>
                <MenuItem onClick={() => handleSyncDatabase()}>同步数据库</MenuItem>
            </Menu>
        </div>
    );
}
