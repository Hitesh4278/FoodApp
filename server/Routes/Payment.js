const express=require('express')
const router=express.Router()

router.post('/checkout',async (req,res)=>{
    let error;
    let status;
    try {
      const { amount, id } = req.body;
  
      const payment = await stripe.paymentIntents.create({
        amount: amount,
        currency: "USD",
        description: "React E-commerce Checkout",
        payment_method: id,
        confirm: true,
      });
  
      console.log("Payment", payment);
  
      status = "success";
    } catch (err) {
      console.log("Error", err);
      status = "failure";
      error = err;
    }
    res.json({ error, status });
})


module.exports=router