import { NavbarComponent, SidebarComponent } from "../components";

const ContentBoxComponent = ({ children, title, userId, userRole, sidebarOptions }) => {
  return (
    <div>
      <NavbarComponent />
      <div className="min-h-screen max-w-auto bg-gray-100 flex flex-col pt-16 ml-20">
        <h1 className="text-3xl font-semibold text-center mb-6 pt-16 text-blue-900 w-full">
          {title}
        </h1>

        <div className="flex ">
          <SidebarComponent options={sidebarOptions} />

          <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg p-8 ml-80">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentBoxComponent;
