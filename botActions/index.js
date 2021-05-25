const orari = (ctx)=>{
    
    console.log(ctx.update.message.text.split(' '))//getting string after command
    let date = new Date(ctx.message.date* 1000).toLocaleString('it-IT',{hour: '2-digit', minute:'2-digit',second:'2-digit'});
    
    console.log(date)
  
    ctx.reply(date);
}

module.exports={orari};