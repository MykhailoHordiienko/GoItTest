import { Loader } from 'components/Loader/Loader';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <>
      <header className="flex items-center justify-center h-[100px] bg-mainGradient rounded-b-[20px]">
        <p className="text-[24px] text-mainWight">Wonderful Header</p>
      </header>
      <main className="bg-mainBg grow rounded-t-[20px]">
        <section className="p-[40px] mx-auto max-w-[1440px] flex flex-col gap-[48px]">
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </section>
      </main>
    </>
  );
};
