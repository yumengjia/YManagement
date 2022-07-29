import PropTypes from 'prop-types'
import { Form,Select,Input,Modal} from 'antd'

AddForm.propTypes = {
    categoryData:PropTypes.array.isRequired, //一级分类的数组
}

export default function AddForm(props){
    const { visible, onCreate, onCancel,categoryData} = props
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title="添加分类"
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
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            name="parentid"
            initialValue={'0'}
            rules={[
              {
                required: true,
                message: '请选择分类',
              },
            ]}
          >
            <Select>
                <Select.Option value='0'>一级分类</Select.Option>
                {
                    categoryData.map(c=><Select.Option value={c._id} key={c._id}>{c.name}</Select.Option>)
                }
            </Select>
          </Form.Item>
          <Form.Item name="categoryName" rules={[{ required: true, message: '分类名称必须输入' }]}>
            <Input type="textarea" />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  