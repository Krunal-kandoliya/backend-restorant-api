const testUser=async(req,res)=>{
try {
    res.status(200).send({
        success:true,
        message:"<h1>test user data api</h1>"
    })
} catch (error) {
   console.log(error) 

}
}

module.exports={testUser}