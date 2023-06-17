import { ReactElement } from 'react';

interface UIModalProps {
  isModalOpen: boolean;
  isMobile?: boolean;
  children: ReactElement;
}

export const UIModal: React.FC<UIModalProps> = ({
  isModalOpen,
  isMobile,
  children,
}) => {
  return (
    <div
      className={`transition-all ${
        isModalOpen
          ? 'bg-opacity-[0.3] opacity-1 z-[10000]'
          : 'bg-opacity-0 opacity-0 z-[-100]'
      } bg-black fixed left-0 top-0 w-[100vw] h-[100vh] flex justify-center items-center`}
    >
      {!isMobile && (
        <div className="flex justify-center items-center h-[100%] xs:h-[40%] lg:h-[70%] w-[100%] xs:w-[80%] lg:w-[70%] bg-white xs:rounded-[10px] relative overflow-scroll sm:overflow-hidden">
          {children}
        </div>
      )}
      {isMobile && <div className='flex justify-center items-center h-[100%] w-[100%] bg-white overflow-scroll'>{children}</div>}
    </div>
  );
};
