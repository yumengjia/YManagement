import React,{useEffect, useState} from 'react'
import ProtoType from 'prop-types'
import { Form,Input, Tree, Modal} from 'antd'

import menuList from '../../config/menuConfig'

UpdateForm.protoType = {
    role:ProtoType.object
}

function UpdateForm(props) {

    const { visible, onCreate, onCancel,role,getMenus} = props
    const {menus} = props.role
    const [form] = Form.useForm();

    const [checkedKeys, setCheckedKeys] = useState();

    const formItemLayout =
    {
      labelCol: {
        span: 4, //指定左侧label的宽度
      },
      wrapperCol: {
        span: 18, //指定右侧包裹的宽度
      },
    }

    const onCheck = (checkedKeysValue) => {
        // console.log('onCheck', checkedKeysValue);
        setCheckedKeys(checkedKeysValue);
    };

    useEffect(()=>{
        getMenus(checkedKeys)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[checkedKeys])
  
    useEffect(()=>{
      
      setCheckedKeys(menus)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[role])


    return ( 
        <Modal
        visible={visible}
        title="设置角色权限"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        // onOk={onOk}
        onOk={() => {
          form
            .validateFields()
            .then(() => {
              form.resetFields();
              onCreate();
              // getCheckedMenus()
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form form={form}>
            <Form.Item label='角色名称' {...formItemLayout}>
                <Input value={role.name}  disabled/>
            </Form.Item>
        </Form>

        <Tree
        defaultExpandAll={true}
        checkable
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        treeData={menuList}
        />
      </Modal>
     );
}

export default UpdateForm;