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
    &__wrap {
      margin: auto auto;
      display: flex;
      align-items: center;
      height: 100%;
    }
    &__score {
      margin-left: 10px;
      width: 200px;
      height: 640px;
      border: 2px solid white;
      ul {
        list-style: none;
        color: white;
        padding: 0;
        text-align: center;
      }
    }
    &__canvas {
      margin-right: 10px;
      height: 640px;
      width: 640px;
      border: 2px solid white;
      image-rendering: pixelated;
    }
  }
`;

export default GameStyled;
