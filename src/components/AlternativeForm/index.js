/* eslint-disable linebreak-style */
import styled from 'styled-components';

const AlternativeForm = styled.form`
    label {
        &[data-isselected="true"] {
            /*  ${({ theme }) => theme.colors.selected}; */
            background-color: #1C6E8C;
        }
        &[data-status="SUCCESS"],
        &[data-right="true"] {
            background-color: ${({ theme }) => theme.colors.success};
        }
        &[data-status="ERROR"] {
            background-color: ${({ theme }) => theme.colors.wrong};
        }
    }
`;

export default AlternativeForm;
