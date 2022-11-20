import { useState, useRef, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import CanvasDraw from 'react-canvas-draw'
import { useSelector, useDispatch } from "react-redux"
import { addSign, setSignFile } from "../actions/action"
// component
import Header from "../component/Header"
// style
import { message, Modal } from 'antd'
import './File.css'
// image
import back from '../image/button/back.png'
import tools from '../image/signing/btn-file.png'
import sign from '../image/signing/btn-pen.png'
import sticker from '../image/signing/btn-sticker.png'
import plus from '../image/button/solid-plus-circle.png'
import trash from '../image/button/trash.png'
import upload from '../image/upload/sign_upload.png'
// json
import { stickers } from "../json/sticker"
// fabric
import { fabric } from 'fabric'

export default function File(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [_showTools,_setShowTools] = useState(true)
    const [_signModalOpen,_setSignModalOpen] = useState(false) // 簽名modal
    const [_stickerModalOpen,_setStickerModalOpen] = useState(false) //貼圖modal
    const [_signCanvasVisible,_setSignCanvasVisible] = useState(false) //簽名的繪製
    const [_drawSignVisible,_setDrawSignVisible] = useState(true) // 繪製簽名 or 上傳
    const signCanvaRef = useRef(null)
    // const displayCanva = useRef(null)
    const _black='#000000'
    const _red='#E11D48'
    const _blue='#1D4ED8'
    const [_brushColor,_setBrushColor] = useState(_black)
    const [_blackStatus,_setBlackStatus] = useState(true)
    const [_blueStatus,_setBlueStatus] = useState(false)
    const [_redStatus,_setRedStatus] = useState(false)
    const theFile = useSelector(state=>state.file)
    const signList = useSelector(state=>state.sign_lists)
    // const [_testImg,_setTestImg] = useState()
    const [_canva,_setCanva] = useState('')
    const [_exportBtnVisible,_setExportBtnVisible] = useState(false)

    const _handleBack=()=>{
        navigate('/')
    }
    const _handleToolList=()=>{
        _setShowTools(!_showTools)
    }
    const _handleSignModal=()=>{
        _setSignModalOpen(true)
        console.log(signList)
    }
    const _handleStickerModal=()=>{
        _setStickerModalOpen(true)
    }
    const _handleSign=()=>{
        _setSignCanvasVisible(!_signCanvasVisible)
    }
    const _handleSaveCanva=()=>{
        console.log('in save')
        const data = signCanvaRef.current.getSaveData()
        const base64 = signCanvaRef.current.canvasContainer.childNodes[1].toDataURL()
        const index = signList.length
        let saveBase64 = {'index':index,'url':base64}
        dispatch(addSign(saveBase64))
        _setSignModalOpen(false)
        _setSignCanvasVisible(false)
    }
    const _handleClear=()=>{
        signCanvaRef.current.clear()
    }
    const _handleBrushColor= color=>e =>{
        switch(color){
            case 'black':
                _setBrushColor(_black)
                _setBlackStatus(true)
                _setBlueStatus(false)
                _setRedStatus(false)
                break;
            case 'blue':
                _setBrushColor(_blue)
                _setBlackStatus(false)
                _setBlueStatus(true)
                _setRedStatus(false)
                break;
            case 'red':
                _setBrushColor(_red)
                _setBlackStatus(false)
                _setBlueStatus(false)
                _setRedStatus(true)
                break;
            default:
                _setBrushColor(_black)
                break;
        }
    }

    const _selectSign = (signIndex)=>{
        _setSignModalOpen(false)
        _setSignCanvasVisible(false)
        fabric.Image.fromURL(signList[signIndex].url,function(img){
            img.scale(0.8)
            _canva.add(img)
            _canva.renderAll()
        })
        _setExportBtnVisible(true)
    }
    const _selectSticker = (stickerIndex) =>{
        _setStickerModalOpen(false)
        console.log(stickerIndex)
        fabric.Image.fromURL(stickers[stickerIndex].url,function(img){
            img.scale(0.8)
            _canva.add(img)
            _canva.renderAll()
        })
        _setExportBtnVisible(true)
    }

    const onSignUpload = event =>{
        console.log(event.target.files[0])
        const url = URL.createObjectURL(event.target.files[0])
        const index = signList.length
        let saveImg = {'index':index,'url':url}
        console.log(saveImg)
        dispatch(addSign(saveImg))
        _setSignModalOpen(false)
        _setSignCanvasVisible(false)
        _setDrawSignVisible(true)
    }

    const _handleExport = () =>{
        var image = _canva.toDataURL("image/jpg").replace("image/png",
        "image/octet-stream");
        const a = document.createElement('a');
        a.href = image
        a.download = `image.jpeg`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a) 
        message.success('下載成功')
        navigate('/')
    }


    useEffect(()=>{
        const canvas = new fabric.Canvas('mainCanvas',{
            width:window.innerWidth,
            height:window.innerHeight
        })
        
        fabric.Image.fromURL(theFile,function(img){
            var imgX = canvas.width / img.width
            canvas.setBackgroundImage(theFile, canvas.renderAll.bind(canvas), {
                width: canvas.width,
                height: canvas.height,
                scaleX: imgX,
                scaleY: imgX,
             });
        })
        _setCanva(canvas)
    },[])

    return(
        <div className="relative">
            <Header/>
            <div className="bg-gray-100 min-h-content pb-8 h-auto overflow-scroll">
                <div className="grid grid-cols-3 py-4 bg-white">
                    <button onClick={_handleBack}>
                        <img src={back} alt="回上一頁" className="pl-6"></img>
                    </button>
                    <div className="text-gray-500 text-center">檔案名稱.pdf</div>
                    <div></div>
                </div>
                {/* <div className="pt-8 mb-8">
                    <div className="text-center text-gray-500">共87頁，第 8 頁</div>
                </div> */}
                <div className="py-3">
                    <canvas id='mainCanvas' className="py-3" width="100%"></canvas>
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
            {
                _exportBtnVisible?
                <div className="absolute" style={{bottom:'24px'}}>
                    <div className="w-screen flex justify-center">
                    <button className="mx-16 w-full bg-yellow-500 py-3 rounded-2xl"
                        onClick={_handleExport}
                    >輸出檔案</button>
                    </div>
                </div>
                :<></>
            }
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
                                <button className={`flex-auto border-yellow-500 border-2 py-3 rounded-t-2xl text-xl ${_drawSignVisible?`bg-yellow-500 text-white`:`bg-white text-gray-500`}`}
                                    onClick={()=>{_setDrawSignVisible(true)}}
                                >
                                    繪製簽名</button>
                                <button className={`flex-auto border-yellow-500 border-2 py-3 rounded-t-2xl text-xl ${_drawSignVisible?`bg-white text-gray-500`:`bg-yellow-500 text-white`}`}
                                    onClick={()=>{_setDrawSignVisible(false)}}
                                >
                                    上傳簽名</button>
                            </div>
                            {
                                _drawSignVisible?
                                <div className="bg-yellow-50 border-yellow-500 border-b-2 border-l-2 border-r-2 rounded-b-2xl h-48 relative">
                                    
                                    <CanvasDraw
                                        brushRadius={3}
                                        className='bg-yellow-100 rounded-b-2xl'
                                        ref={signCanvaRef}
                                        style={{
                                            margin: 'auto',
                                            backgroundColor:'#FEFCE8',width:'100%',height:'100%',
                                        }}
                                        brushColor={_brushColor}
                                        hideGrid
                                    />
                                    <button className="absolute hover:opacity-70" style={{bottom:0,right:0}}
                                        onClick={_handleClear}
                                    ><img src={trash} alt="清除畫布"></img></button>
                                </div>
                                :
                                <div className="bg-yellow-50 border-yellow-500 border-b-2 border-l-2 border-r-2 rounded-b-2xl h-48">
                                    {/* <img src={upload} alt="上傳"></img> */}
                                    <label htmlFor='uploadBtn' 
                                    className='flex flex-col justify-center px-12 py-6 text-gray-500 rounded-xl text-center'
                                    >
                                        <p className="ant-upload-drag-icon flex justify-center">
                                            <img src={upload} alt="檔案上傳"></img>
                                        </p>
                                        <p className="ant-upload-hint text-sm">
                                        *限10mb內的JPG檔
                                        {/* *限10mb內的PDF檔或JPG檔 */}
                                        </p>
                                        <input
                                            accept="image/*,.pdf"
                                            style={{ display: 'none' }}
                                            id="uploadBtn"
                                            type="file"
                                            onChange={onSignUpload}
                                        />
                                    </label>
                                </div>
                            }
                            <div className="flex justify-center mt-4">
                                <button className={`rounded-full w-6 h-6 bg-black mx-2 ${_blackStatus?`border-gray-300 border-2`:``}`} onClick={_handleBrushColor('black')}></button>
                                <button className={`rounded-full w-6 h-6 bg-blue-700 mx-2 ${_blueStatus?`border-gray-300 border-2`:``}`} onClick={_handleBrushColor('blue')}></button>
                                <button className={`rounded-full w-6 h-6 bg-rose-600 mx-2 ${_redStatus?`border-gray-300 border-2`:``}`} onClick={_handleBrushColor('red')}></button>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <button className="drop-shadow-lg bg-white text-gray-500 py-3 rounded-2xl"
                                onClick={()=>{_setSignModalOpen(false);_handleClear();_setSignCanvasVisible(false)}}
                                >取消</button>
                                <button className="drop-shadow-lg bg-yellow-500 text-white py-3 rounded-2xl"
                                onClick={_handleSaveCanva}
                                >確認</button>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col">
                            {
                                signList.length ===0?
                                <></>:<>
                                    {
                                    signList.map((item,index)=>{
                                        return(
                                            <div className="flex items-center justify-between text-center border-yellow-500
                                            border-2  w-full text-xl rounded-2xl hover:bg-gray-200 hover:border-black hover:text-white
                                            mb-2" key={item.index}>
                                                <button className="flex-auto"
                                                name={item.index}
                                                onClick={()=>{_selectSign(index)}}
                                                >
                                                    <img src={item.url} alt="簽名" className="h-12"></img>
                                                </button>
                                                <button>
                                                    <img src={trash} alt="刪除簽名"></img>
                                                </button>
                                            </div>
                                        )
                                    })}
                                </>
                            }
                            <button className="flex items-center justify-center text-center border-yellow-500
                                border-2  w-full text-xl py-3 rounded-2xl hover:bg-black hover:border-black hover:text-white"
                                onClick={_handleSign}>
                            製作簽名<img src={plus} alt="製作簽名" className="ml-2"></img></button>
                        </div>
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
                            stickers.map((item,index)=>{
                                return(
                                    <span key={item.key}>
                                        <button className="mx-2" onClick={()=>{_selectSticker(index)}}>
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