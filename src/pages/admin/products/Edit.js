import React, { useState, useEffect } from 'react'
import { Form, Card, Input, Button } from 'antd'
import { createApi, getOnebyId, modifyOne } from '../../../services/products';
import { serverUrl } from '../../../utils/config';
import { Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

export default function Edit(props) {

    const onFinish = (values) => {
        console.log('Success:', values);
        if (props.match.params.id) {
            modifyOne(props.match.params.id, { ...values, coverImg: imageUrl })
                .then(res => {
                    console.log(res)
                    props.history.push('/admin/products')
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        } else {
            createApi({ ...values, coverImg: imageUrl })
                .then(res => {
                    console.log(res)
                    props.history.push('/admin/products')
                })
                .catch(err => {
                    console.log(err.response.data)
                })
        }

    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const [imageUrl, setImageUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            //successful upload
            // Get this url from response in real world.
            setLoading(false)
            console.log(info)
            setImageUrl(info.file.response.info)
        }
    };

    //props.match.params.id if exist => modify
    //                      undefind => add new

    const [currentData, setCurrentData] = useState({})
    const [form] = Form.useForm()
    //excute when init
    useEffect(() => {

        if (props.match.params.id) {
            form.setFieldsValue({
                name: currentData.name,
                price: currentData.price,
            })
            getOnebyId(props.match.params.id)
                .then(res => {
                    setCurrentData(res)
                    setImageUrl(res.coverImg);
                })

        }
    }, [currentData.name,
    currentData.price,
        form,
    props.match.params.id
    ])


    const priceValidator = async (rule, value) => {
        if (value < 0) {
            throw new Error("Price cannot less than 0!")
        } else if (!value) {
            throw new Error("Price cannot be empty")
        } else {
            // futher api ...
            Promise.resolve();
        }
    }


    return (
        <Card
            title="Edit Products"
            extra={
                <Button onClick={() => props.history.push("/admin/products")}>
                    Go back
                </Button>
            }
        >
            <Form form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            // initialValues = {
            //     {name:currentData.name},
            //     {price:currentData.price}
            // }
            >
                <Form.Item

                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Name cannot be empty' }]}

                >
                    <Input placeholder="Please enter the product name" />
                </Form.Item>
                <Form.Item
                    label="Price"
                    name="price"
                    rules={
                        [{
                            required: true,
                            // message:'Price cannot be empty',
                            validator: priceValidator
                        }]
                    }
                >
                    <Input
                        placeholder="Please enter the product price"
                    />
                </Form.Item>
                <Form.Item label="Product picture">
                    <Upload
                        name="file" // server pre-defined
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={serverUrl + '/api/v1/common/file_upload'}
                        onChange={(info) => handleChange(info)}
                    >
                        {imageUrl ? <img src={serverUrl + imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item><Button type="primary" htmlType="submit">Save</Button></Form.Item>
            </Form>
        </Card>
    )
}
