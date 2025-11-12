/* eslint-disable react/jsx-no-bind */
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { Container } from './styles';

export default function ToastMessage({
  id, text, type = 'default', duration, onRemoveMessage,
}) {
  useEffect(() => {
    const timeOut = setTimeout(() => onRemoveMessage(id), duration || 4000);

    return () => {
      clearTimeout(timeOut);
    };
  }, [id, onRemoveMessage]);

  function handleRemoveToast() {
    onRemoveMessage(id);
  }

  return (
    <Container type={type} onClick={handleRemoveToast}>
      <strong>{text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['default', 'success', 'danger']),
  // eslint-disable-next-line react/require-default-props
  duration: PropTypes.number,
  onRemoveMessage: PropTypes.func.isRequired,
};

ToastMessage.defaultProps = {
  type: 'default',
};
