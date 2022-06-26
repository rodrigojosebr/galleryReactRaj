import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../libs/firebase';
import { Photo } from '../types/Photo.types';
import { v4 as createId } from 'uuid'

//leitura das imagens na galeria
export const getAllPhotos = async () => {
  let list: Photo[] = [];

  const imagesFolder = ref(storage, 'images');
  const photoList = await listAll(imagesFolder);

  for (let i in photoList.items) {
    let photoUrl = await getDownloadURL(photoList.items[i]);
    list.push({
      name: photoList.items[i].name,
      url: photoUrl,
    });
  }
  return list;
}

//envio das imagens para a galeria
export const uploadPhoto = async (file: File) => {
  if (['image/jpg', 'image/jpeg', 'image/png'].includes(file.type)) {
    let randonName = createId();
    let newFile = ref(storage, `images/${randonName}`);
    let upload = await uploadBytes(newFile, file);
    let photoUrl = await getDownloadURL(upload.ref);

    return {
      name: upload.ref.name,
      url: photoUrl
    } as Photo

  } else {
    return new Error('Formato de arquivo inválido')
  }
}