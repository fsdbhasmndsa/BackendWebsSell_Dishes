module.exports.GenerateToken =  (long)=>{
    let count = 0
    let Result = "";
   
    const String = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890"
    while(count <= long)
    {
      
        Result += String.charAt(Math.round(Math.random()* String.length)) 
        count++
    }
    return Result

}