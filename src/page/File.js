import { useState } from "react"
import { useNavigate } from "react-router-dom"
// component
import Header from "../component/Header"
// style
import { Modal } from 'antd'
// image
import back from '../image/button/back.png'
import tools from '../image/signing/btn-file.png'
import sign from '../image/signing/btn-pen.png'
import sticker from '../image/signing/btn-sticker.png'

export default function File(){
    const navigate = useNavigate()
    const [_showTools,_setShowTools] = useState(true)
    const [_signModalOpen,_setSignModalOpen] = useState(false)
    const [_stickerModalOpen,_setStickerModalOpen] = useState(false)

    const _handleBack=()=>{
        navigate('/')
    }
    const _handleToolList=()=>{
        _setShowTools(!_showTools)
    }
    const _handleSignModal=()=>{
        _setSignModalOpen(true)
    }
    const _handleStickerModal=()=>{
        _setStickerModalOpen(true)
    }


    return(
        <div className="relative">
            <Header/>
            <div className="bg-gray-100 min-h-content">
                <div className="grid grid-cols-3 py-4 bg-white">
                    <button onClick={_handleBack}>
                        <img src={back} alt="回上一頁" className="pl-6"></img>
                    </button>
                    <div className="text-gray-500 text-center">檔案名稱.pdf</div>
                    <div></div>
                </div>
                <div className="py-8">
                    <div className="text-center text-gray-500">共87頁，第 8 頁</div>
                </div>
            </div>
            <div className="absolute w-auto h-auto" style={{bottom:'60px',right:'36px'}}>
                <div className="bg-gray-200 flex flex-col items-center rounded-full w-8">
                    {
                        _showTools?
                        <div className="flex flex-col">
                            <button className="w-12 h-12 rounded-full bg-white hover:bg-black drop-shadow-md flex items-center justify-center mb-3"
                                onClick={_handleSignModal}
                            >
                                <img src={sign} alt='簽名按鈕'></img></button>
                            <button className="w-12 h-12 rounded-full bg-white hover:bg-black drop-shadow-md flex items-center justify-center mb-3"
                                onClick={_handleStickerModal}
                            >
                                <img src={sticker} alt='貼圖按鈕'></img></button>
                        </div>:<></>
                    }
                    <button className="w-14 h-14 drop-shadow-md" onClick={_handleToolList}>
                        <img src={tools} alt='展開工具'></img></button>
                </div>
            </div>
            <Modal
                title="我的簽名"
                style={{top:100}}
                visible={_signModalOpen}
                onOk={()=>_setSignModalOpen(false)}
                onCancel={()=>_setSignModalOpen(false)}
            ></Modal>
            <Modal
                title="置入貼圖"
                style={{bottom:20}}
                visible={_stickerModalOpen}
                onOk={()=>_setStickerModalOpen(false)}
                onCancel={()=>_setStickerModalOpen(false)}
            ></Modal>
        </div>
    )
}