import { UIModal } from 'components/modal';
import { useBreakpoints } from 'hooks/breakpoints';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
  FaBuromobelexperte,
} from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ListingImage } from 'utils/interfaces';

export const UIGallery: React.FC<{ images: ListingImage[] }> = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isMobile } = useBreakpoints();

  return (
    <>
      {!isMobile() ? (
        <div
          className="flex cursor-pointer relative aspect-[2/1] rounded-[10px] gap-2 overflow-hidden"
          onClick={() => {
            setIsModalOpen(true);
            document.body.classList.add('preventBodyFromScrolling');
          }}
        >
          <div className="flex-1 hover:opacity-[0.7] transition-opacity">
            <img
              src={images[0].url}
              className="w-[100%] h-[100%] object-cover"
            />
          </div>
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2">
            <div className="hover:opacity-[0.7] transition-opacity">
              <img
                src={images[1].url}
                className="w-[100%] h-[100%] object-cover"
              />
            </div>
            <div className="hover:opacity-[0.7] transition-opacity">
              <img
                src={images[2].url}
                className="w-[100%] h-[100%] object-cover"
              />
            </div>
            <div className="hover:opacity-[0.7] transition-opacity">
              <img
                src={images[3].url}
                className="w-[100%] h-[100%] object-cover"
              />
            </div>
            <div className="hover:opacity-[0.7] transition-opacity">
              <img
                src={images[4].url}
                className="w-[100%] h-[100%] object-cover"
              />
            </div>
          </div>
          <div className="flex justify-center items-center border py-1 px-3 rounded-[5px] absolute bg-white bottom-5 right-5">
            <FaBuromobelexperte />
            <p className="ml-2 font-medium">Show all photos</p>
          </div>
        </div>
      ) : (
        <>
          <div className="py-5">
            <a className="flex items-center" href="/">
              <FaAngleLeft size={24} />
              <span className="ml-2 text-[14px]">Houses</span>
            </a>
          </div>
          <div
            className="w-[100vw] ml-[-25px] mb-3"
            onClick={() => {
              setIsModalOpen(true);
              document.body.classList.add('preventBodyFromScrolling');
            }}
          >
            <Swiper
              effect={'coverflow'}
              slidesPerView={1}
              centeredSlides={true}
              grabCursor={true}
              className="flex aspect-[3/2]"
            >
              {images.map((image, index) => (
                <SwiperSlide>
                  <img
                    src={image.url}
                    alt={`image-${index}`}
                    className="w-[100%]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
      <UIGalleryModal
        images={images}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
};

const UIGalleryModal: React.FC<{
  images: ListingImage[];
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ images, isModalOpen, setIsModalOpen }) => {
  const [index, setIndex] = useState<number>(0);
  const { isMobile } = useBreakpoints();

  const scrollImage = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      if (index < images.length - 1) {
        setIndex(index => index + 1);
      } else {
        setIndex(0);
      }
    } else {
      if (index > 0) {
        setIndex(index => index - 1);
      } else {
        setIndex(images.length - 1);
      }
    }
  };

  useEffect(() => {
    !isModalOpen && setIndex(0);
  }, [isModalOpen]);

  return (
    <UIModal isModalOpen={isModalOpen}>
      <>
        {!isMobile() ? (
          <>
            <button
              onClick={() => {
                setIsModalOpen(false);
                document.body.classList.remove('preventBodyFromScrolling');
              }}
              className="bg-white absolute right-4 top-4 font-bold"
            >
              Close
            </button>
            <div className="flex justify-between items-center aspect-[3-2] h-[80%] lg:h-[70%] w-[100%] px-5">
              <button onClick={() => scrollImage('left')}>
                <FaAngleDoubleLeft size={24} opacity={0.5} />
              </button>
              <div
                style={{ backgroundImage: `url(${images[index].url})` }}
                className={`mx-6 bg-contain bg-no-repeat bg-center h-[100%] w-[60%] lg:w-[50%] transition-all`}
              ></div>
              <button onClick={() => scrollImage('right')}>
                <FaAngleDoubleRight size={24} opacity={0.5} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="fixed bg-white p-4 w-[100%] top-0 font-bold justify-end border-b-2">
              <button
                className="flex items-center font-bold text-[16px]"
                onClick={() => {
                  setIsModalOpen(false);
                  document.body.classList.remove('preventBodyFromScrolling');
                }}
              >
                Back <FaAngleRight />
              </button>
            </div>
            <div className="flex h-[100%] pt-[60px] flex-col">
              {images.map((image, index) => (
                <div className="m-3">
                  <img src={image.url} className="w-[100%]" />
                </div>
              ))}
            </div>
          </>
        )}
      </>
    </UIModal>
  );
};
