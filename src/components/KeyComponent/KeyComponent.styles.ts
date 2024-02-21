import styled from "styled-components";

export const ObjectKey = styled.span``;

export const PropertyKey = styled.span`
  color: #3357CC;
  cursor: pointer;

  &::after {
    content: ":";
  }
`;

export const PairContainer = styled.div`
  display: flex;
  gap: 4px;
`;
