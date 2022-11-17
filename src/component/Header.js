import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setLoginStatus } from '../actions/action'
// image
import logo from '../image/logo/logo-header.png'
import logoMember from '../image/logo/logo-member.png'
import member from '../image/member.png'
// style
import { Drawer,Button } from 'antd'

export default function Header(){
    const [_open,_setOpen]=useState(false);
    const dispatch = useDispatch()
    // 登入狀態
    const _loginStatus = useSelector(state=>state.login_status)
    const navigate = useNavigate()

    const _drawerOpen=()=>{
        _setOpen(true)
    }
    const _drawerClose=()=>{
        _setOpen(false)
    }

    const _handleToLogin=()=>{
        _setOpen(false)
        navigate('/login')
    }

    const _handleLogOut = ()=>{
        dispatch(setLoginStatus(false))
        navigate('/')
    }

    return(
        <div className='w-full h-header bg-black px-12 flex items-center justify-between'>
            <img src={logo} alt="logo"></img>
            <button onClick={_drawerOpen}>
                <img src={member} alt="會員登入"></img>
            </button>
            <Drawer
            closable={true}
            getContainer={false}
            placement="left" onClose={_drawerClose} open={_open}
            width='160px'>
                {
                    _loginStatus?
                    <div className='w-full flex flex-col items-center'>
                        <img src={logoMember} alt="logo" className="mt-12 mb-3"></img>
                        <div className='text-gray-500 mb-12'>歡迎， pabi</div>
                        <Button className='my-2 border-none shadow-none text-lg'>管理文件</Button>
                        <Button className='my-2 border-none shadow-none text-lg'>我的簽名</Button>
                        <Button className='my-2 border-none shadow-none text-lg'>我的收藏</Button>
                        <Button className='my-2 border-none shadow-none text-lg'>設定</Button>
                        <Button className='my-2 border-none shadow-none text-lg'>幫助</Button>
                        <Button className='my-2 border-none shadow-none text-lg mt-6'
                        onClick={_handleLogOut}>登出</Button>
                    </div>
                    :
                    <div className='w-full flex flex-col items-center'>
                        <img src={logoMember} alt="logo" className="mt-12 mb-3"></img>
                        <div className='text-gray-500 mb-12'>歡迎， 你好</div>
                        <Button className='my-2 border-none shadow-none text-lg mt-6' onClick={_handleToLogin}>登入</Button>
                    </div>
                }
            </Drawer>
        </div>
    )
}