import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  z-index: 1;
`;

export const SearchBarWrapper = styled.input`
  padding: 0.1em;
  height: 1.3em;
  border: none;
  margin: 0.3em;
  font-size: 18px;
  outline: none;
  width: 5.5em;
  text-transform: capitalize;
  display: inline;
  position: relative;
  z-index: 1;
  background: transparent;
`;

export const AutoContainer = styled.div`
  transform: translateY(0.3em);
  position: absolute;
  background-color: #fff;
  width: 100%;
  max-height: 10em;
  overflow-y: auto;
  border: 0.5px solid #c9c9c9;
  border-radius: 15px;
  z-index: 99;
  .option {
    z-index: 99;
  }
  .option,
  span {
    text-align: left;
    padding-left: 0.5em;
    padding-top: 0.2em;
    font-size: 16px;
    z-index: 99;
  }
  .option:hover {
    background-color: #1b85cc;
    color: #fff;
    z-index: 99;
  }
  .selected {
    background-color: #1b85cc;
    color: #fff;
    z-index: 99;
  }
`;

export const TagContainer = styled.div`
  z-index: 3;
  position: relative;
  margin: 0 auto;
  width: 25em;
  border: 1px solid #c9c9c9;
  border-radius: 15px;
  &:focus {
    box-shadow: 0px 0px 0px 1px rgba(78, 171, 217, 1);
  }
`;
