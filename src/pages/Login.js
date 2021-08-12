import React from 'react'
import { Form, Input, Button, Checkbox, Card, message } from 'antd';
import {setToken} from '../utils/auth'
import { loginApi } from '../services/auth';
import "./Login.css"



export default function Login(props) {

    
    const onFinish = (values) => {
        // console.log('Success:', values);
        // setToken(values.username)
        // props.history.push("/admin")
        loginApi({
            userName:values.username,
            password:values.password
        })
            .then(res=>{
                if(res.code ==='success'){
                    message.success('Login successfully')
                    setToken(res.token)
                    props.history.push('/admin')
                }else{
                    message.info(res.message)
                }
            })
            .catch(err=>{
                message.error("User is not exist")
            })
    }
    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <Card title="Shopping Admin SYS" className="login-form">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
             >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="Username"/>
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Password"/>
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                    Login
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
}
