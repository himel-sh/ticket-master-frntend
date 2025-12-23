import { FaUserCog, FaUserTag, FaTicketAlt, FaAd } from "react-icons/fa";

import MenuItem from "./MenuItem";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={FaTicketAlt}
        label="Manage Tickets"
        address="manage-tickets"
      />
      <MenuItem
        icon={FaAd}
        label="Advertise Tickets"
        address="advertise-tickets"
      />
      <MenuItem
        icon={FaUserTag}
        label="Seller Requests"
        address="seller-requests"
      />
    </>
  );
};

export default AdminMenu;
