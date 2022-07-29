import { Form,Input,Modal} from 'antd'

function AddForm(props) {

    const { visible, onCreate, onCancel} = props
    const [form] = Form.useForm();

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
        visible={visible}
        title="添加角色"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        forceRender
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
        <Form
          form={form}
          name="form_in_modal"
        >
          <Form.Item
            {...formItemLayout}
            label='角色名称:'
            name="roleName" 
            rules={[{ required: true, message: '请输入角色' }]}
            >
                <Input placeholder='请输入角色名称'/>
          </Form.Item>
        </Form>
      </Modal>
     );
}

export default AddForm;