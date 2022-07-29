import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import { reqDeleteImg } from '../../api';
import {BASE_IMG_URL} from '../../utils/constants.js'


PicturesWall.propTypes = {
    imgs:PropTypes.array
}

function PicturesWall(props) {

    let initImgList = []
    // console.log('props',props);

    if(props.imgs && props.imgs.length>0){
        initImgList = props.imgs.map((img,index)=>({
        uid:-index,
        name:img,
        status:'done',
        url:BASE_IMG_URL + img
        }))
    }
    // console.log('aaa',initImgList);

    const [fileList, setFileList] = useState(initImgList);

    //获取所有已上传图片文件名的数据
    const getImgs = () => {
        // console.log('filelist',fileList);
        return fileList.map(file => file.name)
    }
    

    const onChange = async ({file, fileList:newFileList }) => {
        setFileList(newFileList);
        if(file.status==='done'){
            console.log('2',file,newFileList);
            const result = file.response
            if(result.status===0){
                // console.log('result',result);
                message.success('上传图片成功')
                file = newFileList[newFileList.length-1]
                file.name = result.data.name
                file.url = result.data.url
                // console.log(file); 
                setFileList(newFileList)
            }else{
                message.error('上传图片失败')
            }
        }else if(file.status === 'removed'){ //删除操作
            let result = await reqDeleteImg(file.name)
            if(result.status===0){
                message.success('删除图片成功')
            }else{
                message.error('删除图片失败')
            }
        }
    
        
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
        src = await new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file.originFileObj);
            reader.onload = () => resolve(reader.result);
        });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    useEffect(()=>{
        let imgList = getImgs()
        props.getImgName(imgList)
        // console.log(fileList);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[fileList])


    return ( 
        <ImgCrop rotate>
            <Upload
                name='image' //请求参数名
                action="/api/manage/img/upload"  //上传图片地址http://localhost:5000/upload/image-1658756331199.jpg
                accept='image/*' //接收哪些类型的文件
                listType="picture-card"  //图片样式
                fileList={fileList}  //所有已上传图片文件对象的数组
                onChange={onChange} 
                onPreview={onPreview} //显示预览
            >
                {fileList.length < 5 && '+ Upload'}
            </Upload>
        </ImgCrop>
     );
}

export default PicturesWall;