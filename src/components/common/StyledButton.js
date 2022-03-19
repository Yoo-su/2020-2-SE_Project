import styled from "styled-components"

//배경색과 글자색을 인자로받는 버튼 컴포넌트
export const StyledButton = styled.button`
border: transparent;
color: ${props=>props.color||"black"};
border-radius: 0.5rem;
padding: 0.5rem 1rem;
margin: 0 0.2rem;
font-size:18px;
background: ${props=>props.bgColor};
@media all and (min-width:0px) and (max-width:1280px){
    font-size:12px;
    padding:0.3rem 0.6rem;
}
`;