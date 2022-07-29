import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { EditorState, convertToRaw ,ContentState} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

RichTextEditor.propTypes = {
    detail:PropTypes.string
}

function RichTextEditor(props) {

    //初始值为创建的一个没有内容的编辑对象
    const [editorState,setEditorState] = useState(EditorState.createEmpty()) 

    const initTextEditor = () => {
        const html = props.detail;
        if(html){
            const contentBlock = htmlToDraft(html);
            if (contentBlock) {
                const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState)
            }
        }
    }
   
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState)
      };

    const getDetail = () =>{
        //返回输入数据对应的htmL文本
        return draftToHtml(convertToRaw(editorState.getCurrentContent()))
    }

    //上传图片
    const uploadImageCallBack = (file)=>{
        return new Promise(
            (resolve, reject) => {
              const xhr = new XMLHttpRequest();
              xhr.open('POST', '/manage/img/upload');
              const data = new FormData();
              data.append('image', file);
              xhr.send(data);
              xhr.addEventListener('load', () => {
                const response = JSON.parse(xhr.responseText);
                resolve({data:{link:response.data.url}});
              });
              xhr.addEventListener('error', () => {
                const error = JSON.parse(xhr.responseText);
                reject(error);
              });
            }
          );
    }

    useEffect(()=>{
        props.getTextDetail(getDetail())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[editorState])
    useEffect(()=>{
        initTextEditor()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return ( 
        <div>
             <Editor
                editorState={editorState}
                editorStyle={{border:'1px solid #000',minHeight:'200px',padding:'10px'}}
                onEditorStateChange={onEditorStateChange}
                toolbar={{
                    image: { uploadCallback: uploadImageCallBack, alt: { present: true, mandatory: true } },
                }}
            />
        </div>
     );
}

export default RichTextEditor;