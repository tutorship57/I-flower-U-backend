import PaymentRepo from "../repository/paymentType.repository";

const createPaymentTypeService = async({paytype_name})=>{
    return await PaymentRepo.createPaymentType({paytype_name});
}
export{
    createPaymentTypeService
}