import User from '../models/User'
import Notification from '../shemas/Notifications'

class NotificationControler {
    async index(req, res){
        const checkIsProvider = await User.findOne ({
            where: { id: req.userId, provider: true },
        });

        if(!checkIsProvider) {
            return res
            .status(401)
            .json({ error: 'only provider can load notification'})
        }

        const notifications = Notification.find({
            user: req.userId,
        })
        .sort({ createAt: 'desc'})
        .limit(20);

        return res.json(notifications)
    }

    async update(req, res) {
        const notification = await Notification.findByIdAndUpdate(
            req.params.id,
            {read: true},
            {new: true}
        )

        return res.json(notification)
    }
}

export default new NotificationControler()
