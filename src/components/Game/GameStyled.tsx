import styled from "styled-components";

const GameStyled = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .game {
    &__title {
      color: white;
      margin: 0;
      text-align: center;
    }
    &__canvas {
      margin: auto auto;
      width: 25%;
      height: 80%;
      border: 2px solid white;
      image-rendering: pixelated;
    }
  }
`;

export default GameStyled;
