import * as S from './photoItem.styles';

type PhotoItemProps = {
  url: string;
  name: string;
}

export const PhotoItem = ({ url, name }: PhotoItemProps) => {
  return (
    <S.Container>
      <img src={url} alt={name} />
      {name}
    </S.Container>
  );
}