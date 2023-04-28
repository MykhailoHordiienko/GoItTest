import helloGif from "../../gif/hello-gif.gif";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-[96px]">
      <h1 className="text-[36px] text-mainWight">
        Welcome to the simple tweets App
      </h1>
      <img
        src={helloGif}
        alt="hello-gif"
        className="rounded-[36px]"
      />
    </div>
  );
};
