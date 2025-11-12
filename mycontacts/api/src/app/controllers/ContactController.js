const ContactRepository = require('../repositories/ContactRepository')
const isValidUUID = require('../utils/isValidUUID')

class ContactController {
    async index(request, response) {
        const contacts = await ContactRepository.findAll();

        response.json(contacts);
    }

    async show(request, response) {
        const { id } = request.params;

        if (!isValidUUID(id)) {
            return response.status(400).json({ error: 'Invalid id' });
        }

        const contact = await ContactRepository.findById(id);

        if (!contact){
            // 404: Not Found
            return response.status(404).json({ error: 'Contact not found' });
        }

        response.json(contact);
    }

    async store(request, response) {
        const { name, mail, valor, category_id } = request.body;

        if (!name) {
            return response.status(400).json({ error: 'Name is required' });
        }

        if (category_id && !isValidUUID(category_id)) {
            return response.status(400).json({ error: 'Invalid category' });
        }

        if (mail) {
            const contactExists = await ContactRepository.findByMail(mail);
            if (contactExists) {
                return response.status(400).json({ error: 'Address already in use' });
            }   
        }

        const contact = await ContactRepository.create({
            name,
            mail: mail || null,
            valor,
            category_id: category_id || null,
        });

        response.status(201).json(contact);
    }

    async update(request, response) {
        const { id } = request.params;
        const { name, mail, valor, category_id } = request.body;

        if (!isValidUUID(id)) {
            return response.status(400).json({ error: 'Invalid id' });
        }

        if (category_id && !isValidUUID(category_id)) {
            return response.status(400).json({ error: 'Invalid category' });
        }
        
        if (!name) {
            return response.status(400).json({ error: 'Name is required' });
        }
        
        const contactExists = await ContactRepository.findById(id);
         if (!contactExists) {
            return response.status(404).json({ error: 'Contact not found' });
        }


        if (mail) {
            const contactByMail = await ContactRepository.findByEmail(mail);
        if (contactByMail && contactByMail.id !== id) {
                return response.status(400).json({ error: 'Address already in use' });
            }
        }

        const contact = await ContactRepository.update(id, { 
            name,
            mail: mail || null,
            valor,
            category_id: category_id || null 
        });

        response.json(contact);
    }

    async delete(request, response) {
        const { id } = request.params;

        if (!isValidUUID(id)) {
            return response.status(400).json({ error: 'Invalid id' });
        }

        await ContactRepository.delete(id);
        // 204: No Content
        response.sendStatus(204);


    }
}

module.exports = new ContactController();