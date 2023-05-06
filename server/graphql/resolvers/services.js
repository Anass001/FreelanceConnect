const Service = require('../../models/service');

module.exports = {
    Query: {
        services: async () => {
            try {
                const services = await Service.find();
                return services.map(service => {
                    return { ...service._doc, _id: service.id };
                });
            } catch (err) {
                throw err;
            }
        },
    },
    Mutation: {
        createService: async (_parent, { service }, req) => {
            if (!req.isAuth) throw new Error('Unauthenticated');
            const user = await User.findById(req.userId);
            const newService = new Service({
                title: service.title,
                description: service.description,
                category: service.category,
                price: service.price,
                freelancer: user,
            });
            try {
                const result = await newService.save();
                console.log(result);
                return result;
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    }
}