import React from 'react'
import {Form, Card, Input, Button} from 'antd'


export default function Edit() {

    const onFinish = (values) =>{
        console.log('Success:', values);
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

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
            <Form 
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item 
                    label="Name" 
                    name="productName" 
                    rules={[{required:true,message:'Name cannot be empty'}]} 
                >
                    <Input placeholder="Please enter the product name" />
                </Form.Item>
                <Form.Item 
                    label="Price" 
                    name="productPrice" 
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
