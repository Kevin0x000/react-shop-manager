import React, { useEffect, } from 'react'
import { connect } from 'react-redux'
import { loadProduct } from '../../../store/actions/products'
import { Card, Table, Button, Popconfirm } from 'antd'
import { deleteOne, modifyOne } from '../../../services/products'
import { serverUrl } from '../../../utils/config'
import './List.css'

function List(props) {
    console.log(props)
    // const [dataSource, setDataSource] = useState([])
    // const [total, setTotal] = useState(0)
    // const [currentPage, setCurrentPage] = useState(1)

    // const loadData = (page) => {
    //     listApi(page)
    //         .then(res => {
    //             setDataSource(res.products)
    //             setTotal(res.totalCount)
    //             setCurrentPage(page)
    //         })
    // }

    const { list, page, total,dispatch } = props

    
    useEffect(() => {
        dispatch(
            loadProduct({
                page: 1,
            })
        )
    }, [
        dispatch
    ])

    const loadData = () => {
        props.dispatch(
            loadProduct({
                page: page,
            })
        )
    }




    const columns = [{
        title: 'Product ID',
        key: '_id',
        width: 80,
        align: 'center',
        dataIndex: '_id'
    }, {
        title: 'Product Name',
        dataIndex: 'name',
    }, {
        title: "Product image",
        dataIndex: "coverImg",
        render: (txt, record) =>
            record.coverImg ? (
                <img
                    src={serverUrl + record.coverImg}
                    alt={record.name}
                    style={{ width: "120px" }}
                />
            ) : (
                "No image"
            )
    }, {
        title: 'Product Price',
        dataIndex: 'price',
    }, {
        title: "On the Market",
        dataIndex: "OnSale",
        render: (text, record) => (record.onSale ? "Yes" : "No")
    },
    {
        title: 'Action',
        render: (txt, record, index) => {
            return (
                <div>
                    <Button
                        type="primary"
                        size="small"
                        onClick={() => {
                            props.history.push(`/admin/products/edit/${record._id}`)
                        }}>
                        Edit
                    </Button>
                    <Popconfirm
                        title="Are you sure to delete this?"
                        onConfirm={() => {
                            deleteOne(record._id)
                                .then(res => {
                                    loadData()
                                })
                        }
                        }
                        onCancel={() => console.log()}
                    >
                        <Button
                            type="danger"
                            size="small"
                            style={{ margin: "0 1rem" }}
                        >
                            Delete
                        </Button>
                    </Popconfirm>
                    <Button
                        size="small"
                        onClick={() => {
                            modifyOne(record._id, { onSale: !record.onSale })
                                .then(res => {
                                    loadData()
                                })
                        }}
                    >
                        {record.onSale ? "Offline" : "Lanuch"}
                    </Button>
                </div>
            )
        }
    }]
    return (
        <Card
            title="List"
            extra={
                <Button type="primary" size="small" onClick={() => props.history.push('/admin/products/edit')} >
                    Add new
                </Button>}>
            <Table
                rowKey="_id"
                rowClassName={record => record.onSale ? "bg-green" : "bg-grey"}
                columns={columns}
                bordered
                dataSource={list}
                pagination={{
                    defaultPageSize: 4, 
                    total, 
                    onChange: (p) => {
                        props.dispatch(loadProduct({ page: p }))
                    }
                }}

            />
        </Card>
    )
}

export default connect(state => state.product)(List)