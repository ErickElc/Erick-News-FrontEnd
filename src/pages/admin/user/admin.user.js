import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button} from "@mui/material";
import { AdminProtectedLayout } from "../../../components/ProtectLayout/ProtectedLayout";
import { getUserLocalStorage } from "../../../auth/util";
import { useEffect, useState } from "react";
import http from "../../../api/api";


export default function AdminUser(){
    const [users, setUsers] = useState([]);
    const User = getUserLocalStorage();
    useEffect(()=>{
        http.get('api/users/all').then(res => {
            setUsers(res.data)
        })
        .catch(err => console.log(err));
    },[])
    console.log(users)
    async function ExcluirElementos(id){
        try {
            await http.post(`api/users/delete/${id}`,{
                token: User?.token,
                email: User?.email
            })
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <AdminProtectedLayout>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                _id
                            </TableCell>
                            <TableCell>
                                Nome
                            </TableCell>
                            <TableCell>
                                email
                            </TableCell>
                            <TableCell>
                                Excluir
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map(items =>
                            <TableRow key={items._id}>
                                <TableCell>
                                    "{items._id}"
                                </TableCell>
                                <TableCell>
                                    {items.name}
                                </TableCell>
                                <TableCell>
                                    {items.email}
                                </TableCell>
                                <TableCell>
                                    <Button variant="outlined" color="error" onClick={ () => {ExcluirElementos(items._id) }}>
                                        Excluir
                                    </Button>
                                </TableCell>
                            </TableRow> 
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </AdminProtectedLayout>
    )
}