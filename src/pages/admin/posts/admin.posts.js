import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button} from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../api/api";
import { getUserLocalStorage } from "../../../auth/util";
import { AdminProtectedLayout } from "../../../components/ProtectLayout/ProtectedLayout";
export default function AdminPost(){
    const [posts, setPosts] = useState();
    const User = getUserLocalStorage();
    useEffect(()=>{ 
        http.get('api/posts/all').then(res => {
            setPosts(res.data)
        })
        .catch(err => console.log(err));
    },[])
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
                                UserId
                            </TableCell>
                            <TableCell>
                                UserName
                            </TableCell>
                            <TableCell>
                                Excluir
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {posts?.map(items =>
                            <TableRow key={items._id}>
                                <TableCell>
                                    "{items._id}"
                                </TableCell>
                                <TableCell>
                                    {items.autor?._id}
                                </TableCell>
                                <TableCell>
                                    {items.autor?.name}
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