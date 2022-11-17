import { useState } from 'react';
// component
import Header from '../component/Header'
import Login from '../component/Login';
// image
import uploadIcon from '../image/upload/upload-icon.png'
// style
import { InboxOutlined } from '@ant-design/icons';
import { Button,Upload,message } from 'antd'

const { Dragger } = Upload;

export default function Start(){
    // flag
    const [_loginForm,_setLoginForm] = useState(false);

    const _handleForm=()=>{
      _setLoginForm(true)
    }

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };

    return(
        <div>
            <Header/>
            {
              _loginForm?
              <Login _setLoginForm={_setLoginForm}/>
              :
              <div className='min-h-content bg-gray-100 flex flex-col justify-center items-center'>
                <div className='text-base text-gray-500 mb-6'>急著簽名？快用閃簽！</div>
                <Dragger {...props} className="px-12 text-gray-500 rounded-xl" 
                style={{background:'#E4E4E7',borderRadius:'12px',border:'2px #A1A1AA dashed'}}>
                    <p className="ant-upload-drag-icon flex justify-center">
                      {/* <InboxOutlined /> */}
                      <img src={uploadIcon} alt="檔案上傳"></img>
                    </p>
                    <p className="ant-upload-text" style={{color:'#71717A'}}>上傳文件</p>
                    <p className="ant-upload-hint text-sm">
                    *限10mb內的PDF檔或JPG檔
                    </p>
                </Dragger>
                <div className='text-base text-gray-500 my-6'>or</div>
                <Button size='large' onClick={_handleForm}
                className='w-48 bg-yellow-500 hover:bg-black hover:text-white rounded-lg border-none mb-3'>登入</Button>
                <div className='text-base text-gray-500 mb-6'>管理我的文件和簽名</div>
            </div>
            }
        </div>
    )
}