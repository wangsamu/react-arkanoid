import styled from "styled-components";

const SignInContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 380px;

  h2 {
    margin: 10px 0;
    color: white;
  }

  span {
    color: white;
  }
`;

const ButonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FormInput = styled.div``;

export { SignInContainer, ButonsContainer };
