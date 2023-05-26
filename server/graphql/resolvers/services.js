const Service = require('../../models/service');
const User = require('../../models/user');
const Category = require('../../models/category');

module.exports = {
    Query: {
        services: async () => {
            try {
                const services = await Service.find().populate('freelancer', 'username profile_picture');
                return services.map(service => {
                    return { ...service._doc, _id: service.id };
                });
            } catch (err) {
                throw err;
            }
        },
        service: async (_parent, { serviceId }) => {
            try {
                const service = await Service.findById(serviceId).populate('freelancer', 'username profile_picture');
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
        servicesByCategory: async (_parent, { category }) => {
            try {
                const categoryDocument = await Category.findOne({ name: category });

                if (!categoryDocument) {
                    // Category not found
                    return [];
                }

                // Find services with the matching category ID
                const services = await Service.find({ category: categoryDocument._id })
                    .populate('freelancer', 'username profile_picture');

                return services;
            } catch (err) {
                throw err;
            }
        },
        servicesBySearchQuery: async (_parent, { searchQuery }) => {
            try {
                const services = await Service.aggregate([
                    {
                        $search: {
                            "text": {
                                "query": searchQuery,
                                "path": ["title", "description"],
                                "fuzzy": {
                                    "maxEdits": 2,
                                    "prefixLength": 3
                                }
                            }
                        }
                    }
                ]);

                const servicesWithFreelancer = await Service.populate(services, { path: "freelancer", select: "username profile_picture" });

                return servicesWithFreelancer;

                // return services;
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