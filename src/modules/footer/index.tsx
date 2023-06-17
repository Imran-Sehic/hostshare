export const UIFooter: React.FC<{ shrinkFooter?: boolean }> = ({
  shrinkFooter,
}) => {
  return (
    <div
      className={`${
        shrinkFooter && 'mb-[50px] xs:mb-0 w-[100%] lg:w-[70%]'
      } flex flex-col justify-center items-center p-5 border-t`}
    >
      <img
        src="/assets/hostshare-grey.png"
        className="w-[100px] opacity-[0.4]"
      />
      <p className="opacity-[0.4]">Hostshare &#169; All rights reserved</p>
    </div>
  );
};
