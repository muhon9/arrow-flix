import React from "react";
import Navbar from "../components/Navbar/Navbar";

export default function AdminLayout({ childrens }) {
  return (
    <div>
      <Navbar />
      <main>{childrens}</main>
    </div>
  );
}
