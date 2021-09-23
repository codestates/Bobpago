import React from "react";
import { Container, Xicon } from "./styles";

interface TagProps {
  name?: string;
  id?: number;
  handleDelete?: (id: any) => void | undefined;
}

const Tag = ({ name, id, handleDelete }: TagProps) => {
  const colors = [
    "#385170",
    "#ff894c",
    "#8f8787",
    "#c24d2c",
    "#d7acd4",
    "#ffc93c",
    "#a75265",
    "#d59bf6",
    "#8ed6ff",
    "#ff715a",
    "#ea8a8a",
    "#7a9eb1",
    "#98ded3",
    "#e79a58",
    "#698474",
    "#eda1c1",
  ];

  //id가 있으면 color.length로 나눈 나머지를 인덱스로 사용해서 색 사용,
  //없으면 colors에서 랜덤으로 추출
  const pickColor = () => {
    if (id) {
      const colorNum = id % colors.length;
      return colors[colorNum];
    } else {
      const colorNum = Math.floor(Math.random() * colors.length);
      return colors[colorNum];
    }
  };

  return (
    <Container color={pickColor()}>
      {name}
      <Xicon
        onClick={() => {
          if (typeof handleDelete !== "undefined") {
            handleDelete(id);
          }
        }}
      />
    </Container>
  );
};

export default Tag;
