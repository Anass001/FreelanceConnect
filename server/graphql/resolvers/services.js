const Service = require('../../models/service');
const User = require('../../models/user');

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
        service: async (_parent, { serviceId }) => {
            try {
                const service = await Service.findById(serviceId);
                return { ...service._doc, _id: service.id };
            } catch (err) {
                throw err;
            }
        },
        servicesByUserId: async (_parent, { userId }) => {
            try {
                const services = await Service.find({ freelancer: userId }).populate('freelancer', 'username profile_picture');
                return services.map(service => {
                    return { ...service._doc, _id: service.id };
                });
            } catch (err) {
                throw err;
            }
        },
        servicesByCategoryId: async (_parent, { categoryId }) => {
            try {
                const services = await Service.find({ category: categoryId }).populate('freelancer', 'username profile_picture');
                return services.map(service => {
                    return { ...service._doc, _id: service.id };
                });
            } catch (err) {
                throw err;
            }
        }
    },
    Mutation: {
        createService: async (_parent, { service }, req) => {
            // if (!req.isAuth) throw new Error('Unauthenticated');
            const user = await User.findById("64588c572d6032dd97162aa6");
            const newService = new Service({
                title: service.title,
                description: service.description,
                category: service.category,
                price: service.price,
                images: service.images,
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