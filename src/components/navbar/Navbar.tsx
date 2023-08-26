"use client";
import { useState } from "react";
import classes from "./navbar.module.css";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import ListModal from "@/components/listModal/ListModal";

const Navbar = () => {
  const page = usePathname();
  const isLoggedIn = false;
  const [showListModal, setShowListModal] = useState(false);

  const handleHideListModal = () => {
    setShowListModal((prev) => false);
  };

  const handleShowListModal = () => {
    setShowListModal((prev) => true);
  };

  if (page.includes("login") || page.includes("register")) {
    return null;
  }

  return (
    <header className={classes.container}>
      <nav className={classes.wrapper}>
        <Link className={classes.left} href="/">
          <h2>Jevon Cochran</h2>
        </Link>
        <div className={classes.right}>
          {isLoggedIn ? (
            // If the user is logged in
            <>
              <span className={classes.username}>Jevon Ccohran</span>
              <button className={classes.logoutbtn} onClick={() => signOut()}>
                Logout
              </button>
              <span className={classes.list} onClick={handleShowListModal}>
                List
              </span>
              {showListModal && (
                <ListModal handleHideListModal={handleHideListModal} />
              )}
            </>
          ) : (
            // If the user is not logged in
            <>
              <span>Hello guest!</span>
              <button className={classes.login} onClick={() => signIn()}>
                Log in
              </button>
              <Link className={classes.register} href="/register">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
