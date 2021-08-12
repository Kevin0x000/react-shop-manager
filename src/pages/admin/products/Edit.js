import React,{useState,useEffect} from 'react'
import {Form, Card, Input, Button} from 'antd'
import { createApi,getOnebyId } from '../../../services/products';


export default function Edit(props) {

    const onFinish = (values) =>{
        console.log('Success:', values);
        createApi(values)
            .then(res=>{
                console.log(res)
                props.history.push('/admin/products')
            })
            .catch(err=>{
                console.log(err.response.data)
            })
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    //props.match.params.id if exist => modify
    //                      undefind => add new

    const [currentData,setCurrentData] = useState({})
    const [form] = Form.useForm()
    //excute when init
    useEffect(() => {
        
        if(props.match.params.id){
            form.setFieldsValue({
                name:currentData.name,
                price:currentData.price,
            })
            getOnebyId(props.match.params.id)
                .then(res=>{
                    setCurrentData(res)
                })
               
        }
    }, [currentData.name,
        currentData.price,
        form,
        props.match.params.id
    ])
   

    const priceValidator = async (rule, value) =>{
        if(value < 0){
            throw new Error("Price cannot less than 0!")
        } else if(!value){
            throw new Error("Price cannot be empty")
        } else{
            // futher api ...
            Promise.resolve();
        }
    }


    return (
        <Card title="Edit Products"> 
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
                    rules={[{required:true,message:'Name cannot be empty'}]} 
                    
                >
                    <Input placeholder="Please enter the product name" />
                </Form.Item>
                <Form.Item 
                    label="Price" 
                    name="price" 
                    rules={
                        [{
                            required:true,
                            // message:'Price cannot be empty',
                            validator: priceValidator
                        }]
                    } 
                >
                    <Input 
                        placeholder="Please enter the product price" 
                    />
                </Form.Item>
                <Form.Item><Button type="primary" htmlType="submit">Save</Button></Form.Item>
            </Form>
        </Card>
    )
}
