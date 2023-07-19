import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { Dispatch } from 'react';
import { setSignFile } from '../actions/action';
// component
import Header from '../component/Header'
// image
import uploadIcon from '../image/upload/upload-icon.png'
import homeLogo from '../image/lg-home.png'
// style
import { Button,message } from 'antd'
import { useDispatch } from 'react-redux';

// const { Dragger } = Upload;

export default function Start(){
    // flag
    // const [_loginForm,_setLoginForm] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [_imgView,_setImgView] = useState()

    const _goLogin=()=>{
      // _setLoginForm(true)
      navigate('/login')
    }

    const props = {
        name: 'file',
        multiple: false,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        beforeUpload:(file)=>{
          const isImage = file.type==='image/png';
        },
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            // navigate('/file')
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      };
    
      const onFileUpload = event => {
        console.log(event.target.files[0])
        const url = URL.createObjectURL(event.target.files[0])
        console.log(url)
        _setImgView(url)
        dispatch(setSignFile(url))
        // if(event.target.files[0].type == 'application/pdf'){
        //   console.log('is pdf');
        // }

        navigate('/file')
      }



    return(
        <div>
            <Header/>
            <div className='min-h-content bg-gray-100 flex items-center justify-center'>
              <div className='hidden lg:flex items-center justify-center pr-24'>
                <img src={homeLogo}></img>
              </div>
              <div className='flex flex-col justify-center items-center'>
                <div className='text-base text-gray-500 mb-6'>急著簽名？快用閃簽！</div>
                <label htmlFor='uploadBtn' 
                className='w-[320px] flex flex-col justify-center px-12 py-6 bg-gray-200 text-gray-500 rounded-xl text-center'
                style={{border:'2px #A1A1AA dashed'}}
                >
                  <p className="ant-upload-drag-icon flex justify-center">
                          <img src={uploadIcon} alt="檔案上傳"></img>
                        </p>
                  <p className="ant-upload-text" style={{color:'#71717A'}}>上傳文件</p>
                  <p className="ant-upload-hint text-sm">
                  *限10mb內的JPG檔
                  {/* *限10mb內的PDF檔或JPG檔 */}
                  </p>
                  <input
                    accept="image/*" //,.pdf
                    style={{ display: 'none' }}
                    id="uploadBtn"
                    // multiple
                    type="file"
                    onChange={onFileUpload}
                  />
                </label>
                  <div className='text-base text-gray-500 my-6'>or</div>
                  <Button size='large' onClick={_goLogin}
                  className='w-48 bg-yellow-500 hover:bg-black hover:text-white rounded-lg border-none mb-3'>登入</Button>
                  <div className='text-base text-gray-500 mb-6'>管理文件和簽名</div>
              </div>
          </div>
        </div>
    )
}