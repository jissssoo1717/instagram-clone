import { useEffect, useState } from "react";
import { Container } from "../../components/taps-components";
import styled from "styled-components";
import { auth, db } from "../../firebase";
import { ImageContainer } from "../../components/profile-images";
import { collection, getDocs, orderBy, query } from "firebase/firestore";

const Tap = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  left: 300px;
  right: 0;
`;

const ProfileForm = styled.div`
  width: 1000px;
`;

const UserInfo = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.25);
`;

const UserIcon = styled.img`
  width: 170px;
  height: 170px;
  margin: 0 50px;
`;

const UserForm = styled.div`
  margin-left: 50px;
`;
const UserPosts = styled.div`
  display: grid;
  justify-content: center;
  grid-template-columns: repeat(3, 300px);
  grid-template-rows: repeat(3, 300px);
  grid-auto-rows: 300px;
  gap: 30px;
  margin: 30px 0;
`;

export const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  const user = auth.currentUser;

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setImages([]);

    const getPostImages = async () => {
      const imgRef = collection(db, "posts");
      const imageQuery = await query(imgRef, orderBy("createdAt", "desc"));
      const snapshots = await getDocs(imageQuery);

      snapshots.docs.map((doc) => {
        const { photo } = doc.data();
        setImages((prev) => [...prev, photo]);
      });
    };

    getPostImages();
  }, [isLoading]);

  return (
    <Container>
      {isLoading ? null : (
        <Tap>
          <ProfileForm>
            <UserInfo>
              <UserIcon src="/profile.svg" />
              <UserForm>{user?.displayName}</UserForm>
            </UserInfo>

            <UserPosts>
              {images.map((image) => (
                <ImageContainer key={image} $image={image} />
              ))}
            </UserPosts>
          </ProfileForm>
        </Tap>
      )}
    </Container>
  );
};
