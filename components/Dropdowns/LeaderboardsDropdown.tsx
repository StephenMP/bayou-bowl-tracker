import { createPopper } from "@popperjs/core";
import Link from "next/link";
import React from "react";
import usePopdownCloseEvents from "../../hooks/usePopdownCloseEvents";
import { routes } from "../../util/routes";

const LeaderboardsDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef<HTMLAnchorElement>();
  const popoverDropdownRef = React.createRef<HTMLDivElement>();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => setDropdownPopoverShow(false)
  const ref = usePopdownCloseEvents(closeDropdownPopover)

  function NavLinks() {
    return (
      <>
        <span className="text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"></span>
        <Link href={routes.leaderboard.bb2}>
          <a
            href="#"
            className="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          >
            BayouBowl II
          </a>
        </Link>
      </>
    )
  }

  return (
    <div ref={ref}>
      <a
        className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
        href="#"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        Ladearboards
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <NavLinks />
      </div>
    </div>
  );
};

export default LeaderboardsDropdown;
