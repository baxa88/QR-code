import React, {useState, useRef} from 'react';
import './App.css';
import QRCode from 'qrcode';
import QrReader from 'react-qr-reader';


function App() { 
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const qrRef = useRef(null);


  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
      if (result) {
          setScanResultFile(result);
      }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
        setScanResultWebCam(result);
    }
   }
  return (
    <>
    <div className='container'>
      <h1 >QR kodga o'tkazish , skanerlash va yuklab olish</h1>
      <div className='container-box'>
      <div className='box'>
        <input type='text' placeholder='matnni yozing' onChange={(e) => setText(e.target.value)}/>
        <button onClick={() => generateQrCode()}>QR-ga O'tkazish</button>
        <br/>
        <h5>yuklash uchun kod ustiga bosing</h5>
        <br/>
        <br/>
        {imageUrl ? ( <a href={imageUrl} download> <img src={imageUrl} alt='img'/></a>) : null}
     
      </div>
      <div className='box'>
        <button  onClick={onScanFile}>QR kodni qo'shish</button>
        <QrReader
                              ref={qrRef}
                              delay={300}
                              style={{width: '100%'}}
                              onError={handleErrorFile}
                              onScan={handleScanFile}
                              legacyMode
                            />
       <h5>QR matni: {scanResultFile}</h5>
      </div>
      <div className='box'>
      <h5>Veb-kamera orqali Qr kodini skanerlash</h5>
                             <QrReader
                             delay={300}
                             style={{width: '100%'}}
                             onError={handleErrorWebCam}
                             onScan={handleScanWebCam}
                             />
                             <h5>Skanerlangan kod matni:
                               <br/>
                               {scanResultWebCam}</h5>
      </div>
    </div>
    </div>
       </>
  );
}


export default App;
