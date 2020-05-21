import User from '../models/User'
import Appointment from '../models/Appointment'
import { startDay, endOfDay, parseISO} from 'date-fns'
import { Op } from 'sequelize'
class ScheduleController {
    async index(req, res){
        const checkUserProvider = await User.findOne({
            where: {id: req.userId, provider:true },
        })

        if(!checkUserProvider){
            return res.status(401).json({erro:'User is not provider'})
        }

        const {date } = req.query;
        const parsedDate = parseISO(date);

        const appointments = await Appointment.findAll({
            where: {
                provider_id: req.userId,
                canceled_at:null,
                date: {
                    [Op.between]: [startDay(parsedDate), endOfDay(parsedDate)],
                },
            },
            order: [date]
        })

        return res.json({date})
    }
}

export default new ScheduleController()
