import React from "react";
import Wrapper from "../Wrapper";
import Modal from "../../components/layout/UI/Modal/Modal";
import useHttpErrorHandler from "../../components/hooks/http-error-handler";

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Wrapper>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Wrapper>
    );
  };
};

export default withErrorHandler;
