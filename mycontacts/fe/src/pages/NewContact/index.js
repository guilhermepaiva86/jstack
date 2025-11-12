/* eslint-disable react/jsx-no-bind */
import PageHeader from '../../components/PageHeader';

import ContactForm from '../../components/ContactForm';
import ContactService from '../../services/ContactService';
import toast from '../../utils/toast';

export default function NewContact() {
  async function handleSubmit(formData) {
    try {
      const contact = {
        name: formData.name,
        mail: formData.mail,
        valor: formData.valor,
        category_id: formData.categoryId,
      };

      await ContactService.createContact(contact);

      toast({
        type: 'success',
        text: 'Imóvel cadastrado com sucesso!',
      });
    } catch {
      toast({
        type: 'danger',
        text: 'Ocorreu um erro ao cadastrar o contato!',
        duration: 1000,
      });
    }
  }
  return (
    <>
      <PageHeader
        title="Novo imóvel"
      />
      <ContactForm
        buttonLabel="Cadastrar"
        onSubmit={handleSubmit}
      />
    </>
  );
}
