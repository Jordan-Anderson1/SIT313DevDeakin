import React, { useState, useEffect } from "react";
import { UserAuth } from "./context/AuthContext";
import { getFirestoreData } from "./utils/firebase";
import { PulseLoader } from "react-spinners";

const HeadingImage = () => {
  const { user } = UserAuth();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          setLoading(true);
          const data = await getFirestoreData(user.uid);
          setName(data.name);
        } catch (e) {
          console.log(e.message);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [user]);

  return (
    <>
      <div className="relative h-[400px] w-full">
        <img
          src="/headerImage.png"
          alt="code on a screen"
          className="h-full w-full object-cover"
        />

        {user && (
          <p className="absolute top-0 flex h-full w-full items-center justify-center text-center text-6xl text-white">
            Welcome,{" "}
            {loading ? (
              <PulseLoader color="white" size="40" className="items-end" />
            ) : (
              name
            )}
            !
          </p>
        )}
        <div className="absolute bottom-0 right-0 bg-gray-500 px-2">
          <p>
            Image by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href="https://pixabay.com/users/boskampi-3788146/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1873854"
            >
              Boskampi
            </a>{" "}
            from{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1873854"
            >
              Pixabay
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default HeadingImage;

//headerImage Image by <a href="https://pixabay.com/users/boskampi-3788146/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1873854">Boskampi</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=1873854">Pixabay</a>
