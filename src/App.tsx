import { useEffect, useState, FormEvent } from 'react';
import * as S from './App.styles';
import { PhotoItem } from './components/PhotoItem/photoItem';
import { getAllPhotos, uploadPhoto } from './services/photos';
import { Photo } from './types/Photo.types';


const App = () => {
  const [uploading, setUploading] = useState(false);
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    if (file && file.size > 0) {
      setUploading(true);
      let result = await uploadPhoto(file)
      setUploading(false);

      if (result instanceof Error) {
        alert(`${result.message} - ${result.name}`);
      } else {
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  }

  return (
    <S.Container>
      <S.Area>
        <S.Header>Galeria de Fotos</S.Header>

        <S.UploadForm method="post" onSubmit={handleSubmit}>
          <input type="file" name="image" />
          <input type="submit" value="Enviar" />
          {uploading && "Enviando..."}
        </S.UploadForm>

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