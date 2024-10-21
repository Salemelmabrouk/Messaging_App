import jwt from 'jsonwebtoken'

const auth=(req,res,next) => {
    let token = req.header('token')
     jwt.verify(token,'mysecrectkey' ,async(err,decoded) => { 
    if(err){
      res.json({message: "invalid token",err})
   }else{
 next()
 
  }}) }

export default auth