const decompress=require('decompress');
const http = require('http'); 
const fs = require('fs');
const {zipRef,dataRef,dataTxtZip,jsonRef} = require('./constants');

//decompress zip downloaded and transofrm txt to json
const decomprimiPayload = async ()=>{

    try{
        const files = await decompress(zipRef,dataRef);
        console.log('decompress work done')
        files.forEach(file =>{
            const txtRef = dataRef+'/'+file.path;
            const currentRef = jsonRef+'/'+file.path.split('.')[0]+'.json';
           

            const txtContent= fs.readFileSync(txtRef,'utf-8');
            const lines = txtContent.split(/\r?\n/);
            let keys;
            let results=[];
            for(let i = 0;i<lines.length;i++){
                    if(i===0) keys=lines[i].split('"').join('').split(',');
                    else{
                        let values = lines[i].split('"').join('').split(',');
                        const merged = keys.reduce((obj, key, index) => ({ ...obj, [key]: values[index] }), {});
                        results.push(merged);
                    }
            }
                
            fs.writeFileSync(currentRef, JSON.stringify(results, null, 4), function(err) {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log("JSON saved to " + currentRef);
                    }
            });

            removeTxtByRef(txtRef);
            
            
           
        });

        removeZipFile();

    }catch(error){
        console.error(error)
    }
}

const removeTxtByRef = (txtRef)=>{
    try {
        fs.unlinkSync(txtRef)
        console.log(txtRef+' removed successfull')
    } catch(err) {
        console.error(err)
    }
}

const removeZipFile = ()=>{
    try {
        fs.unlinkSync(zipRef)
        console.log('Zip file removed successfull')
    } catch(err) {
        console.error(err)
    }
}

//Dowload zip from url
const downloadZipFromURL=()=>{
    const zipFile = fs.createWriteStream(zipRef);
    const request = http.get(dataTxtZip, (response) =>{
    let zipPayload = response.pipe(zipFile);
    zipPayload.on('finish',()=>zipFile.end()).on('finish',decomprimiPayload);
    });
}

module.exports={decomprimiPayload,downloadZipFromURL};