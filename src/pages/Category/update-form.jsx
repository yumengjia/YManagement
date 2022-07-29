import React,{useEffect} from 'react'
import PropTypes from 'prop-types'
import { Form,Input,Modal} from 'antd'


UpdateForm.propTypes = {
  categoryName:PropTypes.string.isRequired,
}

export default function UpdateForm(props){
  const { visible, onCreate, onCancel,categoryName} = props
  const [form] = Form.useForm();


  useEffect(()=>{
    form.resetFields()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[visible])

  return (
    <Modal
      visible={visible}
      title="修改分类"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      forceRender
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
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
        name="categoryName" 
        initialValue={categoryName}
        rules={[{ required: true, message: '分类名称必须输入' }]}
        >
          <Input type="textarea" placeholder='请输入分类名称' />
        </Form.Item>
      </Form>
    </Modal>
  );
};
