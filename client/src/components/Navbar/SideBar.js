import { sideBarData } from "./sideBarData";
import SubMenu from "./SubMenu";

export default function SideBar() {
  return (
    <nav className="bg-gray-800 md:block md:w-48 min-h-screen box-border">
      <ul className="pt-4">
        {sideBarData.map((route, i) => (
          <SubMenu item={route} key={i} />
        ))}
      </ul>
    </nav>
  );
}
