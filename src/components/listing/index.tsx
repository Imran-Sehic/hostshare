import { useState } from 'react';
import {
  FaAngleLeft,
  FaAngleRight,
  FaCheckCircle,
  FaHeart,
} from 'react-icons/fa';
import { Listing } from '../../utils/interfaces';

export const UIListing: React.FC<Listing> = props => {
  return (
    <div>
      <ImageSlider
        images={props.images.map(image => image.url)}
        imageId={props.id}
      />
      <p className="font-bold">
        {props.location.city}, {props.location.country.title}
      </p>
      <p className="text-slate-500">
        {props.available ? 'Available now' : 'Not Available at the moment'}
      </p>
      {props.host && (
        <p className="flex items-center text-slate-500">
          {'Verified host'}
          <FaCheckCircle className="ml-2" color="green" />
        </p>
      )}
      {props.pricePerNight && (
        <p>
          <b>
            {props.pricePerNight} {props.currency.symbol}
          </b>{' '}
          {'night'}
        </p>
      )}
    </div>
  );
};

const ImageSlider: React.FC<{ images: string[]; imageId: string }> = ({
  images,
  imageId,
}) => {
  const [index, setIndex] = useState<number>(0);

  const scrollImage = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      if (index < images.length - 1) {
        setIndex(index => index + 1);
      }
    } else {
      if (index > 0) {
        setIndex(index => index - 1);
      }
    }
  };

  return (
    <div className="group w-[100%] aspect-square mb-3 rounded-[10px] relative">
      <i className="p-1 bg-white rounded-[5px] opacity-80 absolute top-1 right-1">
        <FaHeart color={'grey'} opacity={0.5} size={16} />
      </i>
      {index > 0 && (
        <button
          className="opacity-0 group-hover:opacity-80 transition-all absolute top-[50%] translate-y-[-50%] left-2 p-2 bg-white rounded-[50%]"
          onClick={() => scrollImage('left')}
        >
          <FaAngleLeft size={12} />
        </button>
      )}
      <a href={`/listing/${imageId}`}>
        <img
          className="h-[100%] w-[100%] rounded-[10px]"
          src={images[index]}
          alt={'main image'}
        />
      </a>
      {index < images.length - 1 && (
        <button
          className="opacity-0 group-hover:opacity-80 transition-all absolute top-[50%] translate-y-[-50%] right-2 p-2 bg-white rounded-[50%]"
          onClick={() => scrollImage('right')}
        >
          <FaAngleRight size={12} />
        </button>
      )}
      <div className="bg-white opacity-0 group-hover:opacity-80 transition-all absolute bottom-1 left-[50%] text-grey text-[10px] font-bold translate-x-[-50%] py-[3px] px-[10px] rounded-[10px]">
        <span className="text-slate-700 opacity-50">
          {index + 1} &#x2022; {images.length}
        </span>
      </div>
    </div>
  );
};
