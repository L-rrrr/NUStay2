import Header from './components/header';

const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="w-full h-screen flex flex-col mt-12">
        {children}
      </div>
    </>
  );
};

export default MainLayout;
