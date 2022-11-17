import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setLoginStatus } from '../actions/action';
// component
import Header from '../component/Header'
// image
import logo from '../image/logo/logo-registed.png'
import fb from '../image/button/facebook.png'
import gmail from '../image/button/gmail.png'
import inputMail from '../image/login/login-input-email.png'
import inputLock from '../image/login/login-input-lock.png'
import inputName from '../image/login/login-input-name.png'
// style
import { CloseOutlined } from '@ant-design/icons';
import { Button, Input, message } from 'antd';

export default function Login(){
    const _loginStatus = useSelector(state => state.login_status)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [_passwordVisible,_setPasswordVisible] = useState(false)
    const [_isLogin,_setIsLogin] = useState(true)

    // input info
    const [_mailStatus,_setMailStatus] = useState('')
    const [_mail,_setMail] = useState('')
    const [_passwordStatus,_setPasswordStatus] = useState('')
    const [_password,_setPassword] = useState('')
    const [_nameStatus,_setNameStatus] = useState('')
    const [_name,_setName] = useState('')

    const _backtoHome=()=>{
        navigate('/')
    }

    const _handleEmail=(e)=>{
        if(e.target.value == ''){
            _setMailStatus('error')
        }else{
            _setMailStatus('')
        }
        _setMail(e.target.value)
    }
    const _handlePassword=(e)=>{
        if(e.target.value == ''){
            _setPasswordStatus('error')
        }else _setPasswordStatus('')
        _setPassword(e.target.value)
    }

    const _handleLogin=()=>{
        if(_mail=='' || _password==''){
            message.error('帳號或密碼錯誤')
        }else{
            dispatch(setLoginStatus(true))
        }
    }

    const _handleName = (e)=>{
        if(e.target.value == ''){
            _setNameStatus('error')
        }else _setNameStatus('')
        _setName(e.target.value)
    }

    const _handleSignup=()=>{
        
    }

    const _handleLoginSign=()=>{
        _setIsLogin(!_isLogin)
        _setMail('')
        _setPassword('')
        _setName('')
    }

    return(
        <div>
            <Header/>
            <div className="bg-gray-100 min-h-content">
                <div className='text-end pt-6'>
                    <Button shape="circle" icon={<CloseOutlined />} onClick={_backtoHome}
                    className="mr-6 border-none font-black"></Button>
                </div>
                <div className='flex flex-col items-center mx-20 pt-12 pb-20'>
                    <img src={logo} alt="logo" className='mb-3'></img>
                    <div className='text-lg text-gray-500 font-black mb-6'>
                        { _isLogin?`登入帳戶`:`建立帳戶`}
                    </div>
                    <div className='flex justify-center'>
                        <button className='mx-2'>
                            <img src={fb}></img>
                        </button>
                        <button className='mx-2'>
                            <img src={gmail}></img>
                        </button>
                    </div>
                    <div className='text-base text-gray-500 my-3'>or</div>
                    {_isLogin?
                    <></>:
                    <div className='w-full'>
                        <Input size="large" placeholder='暱稱' prefix={<img src={inputName} className="mx-2"/>}
                        status={_nameStatus} onChange={_handleName}
                        className="rounded-xl my-2 p-2">
                        </Input>
                        {
                            _nameStatus == 'error'?
                            <div className='text-red-500 mb-2 text-left'>請輸入暱稱</div>
                            :<></>
                        }
                    </div>}
                    <div className='w-full'>
                        <Input size="large" placeholder='電子郵件' prefix={<img src={inputMail} className="mx-2"/>}
                        status={_mailStatus} onChange={_handleEmail}
                        className="rounded-xl my-2 p-2">
                        </Input>
                        {
                            _mailStatus == 'error'?
                            <div className='text-red-500 mb-2 text-left'>請輸入正確的電子郵件格式</div>
                            :<></>
                        }
                    </div>
                    <div className='w-full'>
                        <Input.Password size="large" placeholder='密碼' prefix={<img src={inputLock} className="mx-2" />}
                        status={_passwordStatus} onChange={_handlePassword}
                        className="rounded-xl my-2 p-2"/>
                        {
                            _passwordStatus == 'error'?
                            <div className='text-red-500 mb-2 text-left'>請輸入密碼</div>
                            :<></>
                        }
                    </div>
                    <button className='border-none text-red-500 mb-4'>忘記密碼？</button>
                    <Button size='large'
                    onClick={_handleLogin}
                    className='w-full bg-yellow-500 hover:bg-black hover:text-white rounded-lg border-none mb-3 disabled:opacity-50'>
                        {_isLogin?`登入`:`註冊`}</Button>
                    <div className='flex'>
                        <div className='text-sm text-gray-500'>{_isLogin?`還沒有帳戶？`:`已經有帳戶？`}</div>
                        <button className='border-none text-red-500 hover:underline hover:underline-offset-4'
                         onClick={_handleLoginSign}>{_isLogin?`建立帳戶`:`前往登入`}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}