import React, {useEffect,useState} from 'react'
import { Card, Table, Button, Popconfirm } from 'antd' 
import { listApi } from '../../../services/products'

export default function List(props) {
    const dataSource = [{
        id:1,
        name:"p1",
        price:5
    },{
        id:2,
        name:"p2",
        price:89
    },{
        id:3,
        name:"p3",
        price:2.5
    }]

    useEffect(() => {
        listApi()
        .then(res=>{
            console.log(res)
        })
        
    }, [])


    const columns = [{
        title:'Product ID',
        key:'id',
        width:80,
        align:'center'
    },{
        title:'Product Name',
        dataIndex:'name',
    },{
        title:'Product Price',
        dataIndex:'price',
    },{
        title:'Action',
        render:(txt, record, index) =>{
            return(
                <div>
                    <Button type="primary" size="small">
                        Edit
                    </Button>
                    <Popconfirm 
                    title="Are you sure to delete this?"
                    onConfirm={()=>console.log()}
                    onCancel={()=>console.log()}
                    >
                        <Button type="danger"size="small" style={{margin: "0 1rem"}}>
                            Delete
                        </Button>
                    </Popconfirm>
                    
                </div>
            )
        }
    }]
    return (
        <Card 
            title="List" 
            extra={
                <Button type="primary" size="small" onClick={()=>props.history.push('/admin/products/edit')} >
                    Add new
                </Button>}>
            <Table rowKey="id" columns={columns} bordered dataSource={dataSource}/>
        </Card>
    )
}
