import { useEffect, useState } from 'react';
import * as S from './App.styles';
import { getAllPhotos } from './services/photos';
import { Photo } from './types/Photo.types';
import { PhotoItem } from './components/PhotoItem/photoItem'


const App = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await getAllPhotos());
      setLoading(false);
    }
    getPhotos();
  }, []);

  return (
    <S.Container>
      <S.Area>
        <S.Header>Galeria de Fotos</S.Header>

        {/* Área Fotos /> */}

        {loading &&
          <S.ScreenWarning>
            <div className="emoji">😁</div>
            <div>Carregando...</div>
          </S.ScreenWarning>
        }

        {!loading && photos.length > 0 &&
          <S.PhotoList>
            {photos.map((item, index) => (
              <PhotoItem key={index} url={item.url} name={item.name} />
            ))}
          </S.PhotoList>
        }

        {!loading && photos.length <= 0 &&
          <S.ScreenWarning>
            <div className="emoji">😢</div>
            <div>Sem fotos na galeria</div>
          </S.ScreenWarning>
        }
      </S.Area>
    </S.Container>
  );
}

export default App;