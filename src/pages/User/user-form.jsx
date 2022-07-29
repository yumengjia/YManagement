import { Form,Input,Modal, Select} from 'antd'

function UserForm(props) {

    const {roles,visible,onCancel,onCreate,user} = props
    const [form] = Form.useForm();
    const userObj = user|| {}

    const formItemLayout =
    {
        labelCol: {
            span: 4, //指定左侧label的宽度
        },
        wrapperCol: {
            span: 18, //指定右侧包裹的宽度
        },
    }

    return ( 
        <Modal
        destroyOnClose
        visible={visible}
        title={userObj._id? '修改用户':"添加用户"}
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
              
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
            <Form  form={form} {...formItemLayout} preserve={false}>
                <Form.Item
                    label='用户名:'
                    name="username"
                    initialValue={userObj.username} 
                    rules={[{ required: true, message: '请输入用户名' }]}
                    >
                        <Input placeholder='请输入用户名'/>
                </Form.Item>
        
                {
                    userObj._id? null:(
                        <Form.Item
                            label='密码:'
                            name="password" 
                            rules={[{ required: true, message: '请输入密码' }]}
                            >
                                <Input type='password' placeholder='请输入密码'/>
                        </Form.Item>
                    )
                }
                <Form.Item
                    label='手机号:'
                    name="phone" 
                    initialValue={userObj.phone} 
                    rules={[{ required: true, message: '请输入手机号' }]}
                    >
                        <Input placeholder='请输入手机号'/>
                </Form.Item>

                <Form.Item
                    label='邮箱:'
                    name="email" 
                    initialValue={userObj.email} 
                    rules={[{ required: true, message: '请输入邮箱' }]}
                    >
                        <Input placeholder='请输入邮箱'/>
                </Form.Item>

                <Form.Item
                    label='角色:'
                    name="role_id" 
                    initialValue={userObj.role_id}
                    rules={[{ required: true}]}
                    >
                        <Select placeholder='请输入角色' >
                            {
                                roles.map((role) => <Select.Option key={role._id} value={role._id}>{role.name}</Select.Option>)
                            }
                        </Select>
                </Form.Item>
            </Form>
      </Modal>
     );
}

export default UserForm;