import React from 'react';
import Desktop from '@theme-original/DocSidebar/Desktop';
import SearchBar from '@theme-original/SearchBar';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import styles from "./styles.module.css";
import ProductSwitcher from "./ProductSwitcher";
import VersionSwitcher from "./VersionSwitcher";

export default function DesktopWrapper(props) {
  return (
    <div className={styles.DocSidebarWrapper}>
      <SearchBar />
      <ProductSwitcher />
      <VersionSwitcher />
      <Desktop {...props} />
      <hr />
      <NavbarColorModeToggle className={styles.colorModeToggle} />
    </div>
  );
}
