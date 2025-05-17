import {useMemo} from "react";

export const SideNavItem = ( {title, to, icon, pathname, colors} ) => {

  const routes = useMemo( () => ( {
    '/dashboard': 'Dashboard',
    '/users': 'Manage Team',
    '/employees': 'Employees',
    '/invoices': 'Invoices Balances',
    '/form': 'Profile Form',
    '/calendar': 'Calendar',
    '/faq': 'FAQ Page',
    '/bar': 'Bar Chart',
    '/pie': 'Pie Chart',
    '/line': 'Line Chart'
  } ), [] )

  return (
    <MenuItem
      // onMouseEnter={prefetchData}
      active={routes[ pathname ] === title}
      style={{color: colors.grey[ 100 ]}}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};