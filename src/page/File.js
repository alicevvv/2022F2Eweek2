import { useState } from "react"
import { useNavigate } from "react-router-dom"
// component
import Header from "../component/Header"
// style
import { Modal, Menu } from 'antd'
import './File.css'
// image
import back from '../image/button/back.png'
import tools from '../image/signing/btn-file.png'
import sign from '../image/signing/btn-pen.png'
import sticker from '../image/signing/btn-sticker.png'
import plus from '../image/button/solid-plus-circle.png'
import trash from '../image/button/trash.png'
// json
import { stickers } from "../json/sticker"

export default function File(){
    const navigate = useNavigate()
    const [_showTools,_setShowTools] = useState(true)
    const [_signModalOpen,_setSignModalOpen] = useState(false)
    const [_stickerModalOpen,_setStickerModalOpen] = useState(false)
    const [_signCanvasVisible,_setSignCanvasVisible] = useState(false)

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
    const _handleSign=()=>{
        _setSignCanvasVisible(!_signCanvasVisible)
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
                centered
                open={_signModalOpen}
                onOk={()=>_setSignModalOpen(false)}
                onCancel={()=>_setSignModalOpen(false)}
                footer={null}
                closable={false}
            >
                <div className="py-4">
                    <div className="text-center font-bold text-xl text-gray-500 mb-3">我的簽名</div>
                    {
                        _signCanvasVisible?
                        <div className="w-full">
                            <div className="flex w-full items-center">
                                <button className="flex-auto bg-yellow-500 border-yellow-500 border-2 py-3 rounded-t-2xl text-white text-xl">
                                    繪製簽名</button>
                                <button className="flex-auto bg-white border-yellow-500 border-2 py-3 rounded-t-2xl text-gray-500 text-xl">
                                    上傳簽名</button>
                            </div>
                            <div className="bg-yellow-50 border-yellow-500 border-b-2 border-l-2 border-r-2 rounded-b-2xl h-48 relative">
                                
                                <button className="absolute hover:opacity-70" style={{bottom:0,right:0}}><img src={trash}></img></button>
                            </div>
                            <div className="flex justify-center mt-4">
                                <button className="rounded-full w-6 h-6 bg-black mx-2 active"></button>
                                <button className="rounded-full w-6 h-6 bg-blue-700 mx-2"></button>
                                <button className="rounded-full w-6 h-6 bg-rose-600 mx-2"></button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <button className="drop-shadow-lg bg-white text-gray-500 py-3 rounded-2xl">取消</button>
                                <button className="drop-shadow-lg bg-gray-300 text-white py-3 rounded-2xl">確認</button>
                            </div>
                        </div>:
                        <button className="flex items-center justify-center text-center border-yellow-500
                        border-2  w-full text-xl py-3 rounded-xl" style={{boxShadow:''}}
                        onClick={_handleSign}>
                            製作簽名<img src={plus} alt="製作簽名" className="ml-2"></img></button>
                    }
                </div>
            </Modal>
            <Modal
                centered
                open={_stickerModalOpen}
                onOk={()=>_setStickerModalOpen(false)}
                onCancel={()=>_setStickerModalOpen(false)}
                footer={null}
                closable={false}
            >
                <div className="py-4">
                    <div className="text-center font-bold text-xl text-gray-500 mb-3">我的貼圖</div>
                    <div className="flex flex-wrap">
                        {
                            stickers.map((item)=>{
                                return(
                                    <span key={item.key}>
                                        <button className="mx-2">
                                            <img src={item.url} alt={`sticker${item.index}`}></img>
                                        </button>
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}