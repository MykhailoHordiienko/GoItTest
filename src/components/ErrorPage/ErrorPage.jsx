import DefaultJpeg from '../../img/defaultImg.jpeg';

export const ErrorPage = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-5 font-bold text-mainWight">
        {text ?? 'Something go wrong, reload please...'}
      </h1>
      <img
        src={DefaultJpeg}
        alt="error"
        className="w-96 md:w-[500px] rounded-md"
      />
    </div>
  );
};
