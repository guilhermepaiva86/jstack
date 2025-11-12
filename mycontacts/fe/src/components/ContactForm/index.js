import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Button from '../Button';
import FormGroup from '../FormGroup';
import Input from '../Input';
import Select from '../Select';
import { Form, ButtonContainer } from './styles';
import useErrors from '../../hooks/useErrors';
import CategoryService from '../../services/CategoryService';

export default function ContactForm({ buttonLabel, onSubmit }) {
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [valor, setValor] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    setError, removeError, getErrorMessageByFieldName, errors,
  } = useErrors();

  const isFormValid = (name && errors.length === 0);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoryService.listCategories();
        setCategories(categoriesList);
      } catch (error) {} finally {
        setIsLoadingCategories(false);
      }
    }
    loadCategories();
  }, []);

  function handleNameChange(event) {
    setName(event.target.value);

    if (!event.target.value) {
      setError({ field: 'name', message: 'Nome é obrigatório' });
    } else {
      removeError('name');
    }
  }

  function handleValueChange(event) {
    setValor(event.target.value);

    const isNumericRegex = (str) => /^[+-]?\d+(\.\d+)?$/.test(str);

    if (isNumericRegex(event.target.value)) {
      removeError('valor');
    } else {
      setError({ field: 'valor', message: 'Valor inválido' });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsSubmitting(true);

    onSubmit({
      name, mail, valor, categoryId,
    }).finally(() => {
      setIsSubmitting(false);
    });
  }

  return (
    // eslint-disable-next-line react/jsx-no-bind
    <Form onSubmit={handleSubmit}>
      <FormGroup error={getErrorMessageByFieldName('name')}>
        <Input
          error={getErrorMessageByFieldName('name')}
          placeholder="Nome *"
          value={name}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleNameChange}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup>
        <Input
          placeholder="Endereço"
          value={mail}
          onChange={(event) => setMail(event.target.value)}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup error={getErrorMessageByFieldName('valor')}>
        <Input
          error={getErrorMessageByFieldName('valor')}
          type="number"
          placeholder="Valor"
          value={valor}
          // eslint-disable-next-line react/jsx-no-bind
          onChange={handleValueChange}
          disabled={isSubmitting}
        />
      </FormGroup>
      <FormGroup $isloading={isLoadingCategories}>
        <Select
          value={categoryId}
          onChange={(event) => setCategoryId(event.target.value)}
          disabled={isLoadingCategories || isSubmitting}
        >
          <option value="">Sem categoria</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </FormGroup>
      <ButtonContainer>
        <Button type="submit" disabled={!isFormValid || isSubmitting}>
          {!isSubmitting && buttonLabel}
        </Button>
      </ButtonContainer>
    </Form>
  );
}

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
