import React from "react";

const currentYear = (new Date()).getFullYear();

export default {
  apiUrl: 'http://yoursite.com/api/',
};

const siteConfig = {
  siteName: 'FRANK\'S DEMO',
  siteIcon: 'ion-flash',
  footerText: (
      <React.Fragment>
        A Full-Stack JavaScript Demo ©{currentYear} Created by
        <a href="mailto:franklan118@gmail.com"> Frank Lan</a>
      </React.Fragment>
  ),
};
const themeConfig = {
  topbar: 'themedefault',
  sidebar: 'themedefault',
  layout: 'themedefault',
  theme: 'themedefault',
};
const language = 'english';

const jwtConfig = {
  fetchUrl: '/api/',
  secretKey: 'secretKey',
};

export { siteConfig, language, themeConfig, jwtConfig };
