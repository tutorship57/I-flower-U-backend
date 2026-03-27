import { asyncHandler } from "../../../shared/middleware/asyncHandler.Middleware";
import { getReservationStocksFilterService } from "../service/reservation-stock.service";

const getRerservationStocksController = asyncHandler(async(req,res,next)=>{
    // #swagger.tags = ['ReservationStock']
    const { stock_id } = req.params
    const filters = req.query;
    const reservationStocksData = await getReservationStocksFilterService(filters,stock_id)
    return res.status(200).json({
        data:reservationStocksData
    })
}
)

export {
    getRerservationStocksController
}