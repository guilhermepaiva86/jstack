const CategoriesRepository = require('../repositories/CategoriesRepository');

class CategoryController {
    async index(request, response) {
        const categories = await CategoriesRepository.findAll();

        response.json(categories);
    }
    
    async store(request, response) {
        const { name } = request.body;

        if (!name) {
            return response.status(400).json({ error: 'Name is required' });
        }

        const category = await CategoriesRepository.create({name});

        response.json(category);
    }
 
//GET, UPTADE E DELETE
/*  show(request, response) {
        response.send('ok - index')
    }
    
/*  update(request, response) {
        response.send('ok - index')
    }
    
    delete(request, response) {
        response.send('ok - index')
    }
 */   
}

module.exports = new CategoryController();