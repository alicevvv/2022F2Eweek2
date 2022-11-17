import { useSelector } from 'react-redux';
// image
import logo from '../image/logo/logo-header.png'
// style
import { CloseOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

export default function Login(props){
    const {_setLoginForm} = props;
    const _loginStatus = useSelector(state => state.login_status)
    console.log(_loginStatus)

    const _handleForm=()=>{
        _setLoginForm(false)
    }

    const _onFinish = (values) => {
        console.log('Success:', values);
    };

    const _onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };

    return(
        <div>
            <div className='text-end py-6'>
                <Button shape="circle" icon={<CloseOutlined />} onClick={_handleForm}
                className="mr-6 border-none font-black"></Button>
            </div>
            <div className='flex flex-col items-center'>
                <img src={logo} alt="logo" className='py-3'></img>
                <div className='text-lg text-gray-500 font-black mb-6'>登入帳戶</div>
                <div className='flex justify-center'>
                    <Button shape='circle' type='primary' 
                    className='bg-blue-500 mx-2'>F</Button>
                    <Button shape='circle' type=''
                    className='mx-2'>G</Button>
                </div>
                <div className='text-base text-gray-500 my-6'>or</div>
                <Input size="large" placeholder='電子郵件' prefix={<MailOutlined />}
                className="rounded-xl"></Input>
                <Input size="large" placeholder='密碼' prefix={<MailOutlined />}
                className="rounded-xl"></Input>
                <Button size='large' 
                // onClick={}
                className='w-48 bg-yellow-500 hover:bg-black hover:text-white rounded-lg border-none mb-3'>登入</Button>
                <div className='flex'>
                    <div className='text-sm text-gray-500'>還沒有帳戶？</div>
                    <button className='border-none text-red-500'>建立帳戶</button>
                </div>
            </div>
        </div>
    )
}