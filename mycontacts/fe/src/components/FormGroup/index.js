import PropTypes from 'prop-types';
import { Container } from './styles';

export default function FormGroup({ children, $error, $isloading }) {
  return (
    <Container>
      <div className="form-item">
        {children}
        {$isloading && <div className="loader">Carregando...</div>}
      </div>
      {$error && <small>{$error}</small>}
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  $error: PropTypes.string,
  $isloading: PropTypes.bool,
};

FormGroup.defaultProps = {
  $error: null,
  $isloading: false,
};
