import styled from "styled-components";
import { Container, OptionForm, Button } from "../../components/opt-components";
import { Logout } from "../../to/opt-func";

const LogoutButton = styled(Button)`
  border-radius: 10px 10px 0 0;
`;

const CancleButton = styled(Button)`
  border-radius: 0 0 10px 10px;
`;

type Props = {
  optionCloseHandle: () => void;
};

export const ProfileOption = ({ optionCloseHandle }: Props) => {
  return (
    <Container>
      <OptionForm>
        <LogoutButton onClick={Logout}>로그아웃</LogoutButton>
        <CancleButton onClick={optionCloseHandle}>취소</CancleButton>
      </OptionForm>
    </Container>
  );
};
