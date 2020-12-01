import React from 'react';
import PropTypes from 'prop-types';

const SvgIcon = (props) => (
  <svg 
    version="1.1"
    viewBox={props.viewBox}
    aria-labelledby={props.ariaLabel}
    fill="none"
    className={props.classVariant.filter(cv => cv && cv).join(" ")}
    role="img"
  >
    <title id={props.ariaLabel}>{props.title}</title>
    {props.children}
  </svg>
);

SvgIcon.propTypes = {
  classVariant: PropTypes.arrayOf(PropTypes.string)
};

const SidebarOpenIcon = ({classVariant}) => (
  <SvgIcon 
    viewBox="0 0 40 30"
    ariaLabel="Open Sidebar"
    classVariant={["sidebar__toggle--svg", classVariant]}>
    <line x1="0" x2="100%" y1="2" y2="2" stroke="#FFFFFF" strokeWidth="4" />
    <line x1="0" x2="100%" y1="15" y2="15" stroke="#FFFFFF" strokeWidth="4" />
    <line x1="0" x2="100%" y1="28" y2="28" stroke="#FFFFFF" strokeWidth="4" />
  </SvgIcon>
);

const CloseIcon = ({classVariant}) => (
  <SvgIcon 
    viewBox="0 0 20 20"
    ariaLabel="Close Sidebar"
    classVariant={["sidebar__toggle--svg", classVariant]}>
    <line x1="2" x2="18" y1="2" y2="18" stroke="#282c34" strokeWidth="5" />
    <line x1="18" x2="2" y1="2" y2="18" stroke="#282c34" strokeWidth="5" />
  </SvgIcon>
);

const UnlockIcon = ({classVariant}) => (
<SvgIcon 
  viewBox="0 0 16 22"
  ariaLabel="Public Note"
  classVariant={["editor__buttons--svg", classVariant]}>
  <path d="M3.2,10.8l0-3.2c0.2-3.5,2.4-5,4.6-5s4.4,1.6,4.6,5l2-0.1c-0.2-4.8-3.6-7-6.6-7c-3,0-6.4,2.2-6.6,7v3.2H0V22h16
	V10.8H3.2z M14,20H2v-7.2h12V20z" fill="#6a6a6a" />
</SvgIcon>
);

const LockIcon = ({classVariant}) => (
  <SvgIcon 
    viewBox="0 0 16 22"
    ariaLabel="Private Note"
    classVariant={["editor__buttons--svg", classVariant]}>
    <path 
      style={{fill: 'black'}}
      d="M14.8,10.8l0-3.2C14.6,2.8,11.2,0.6,8,0.6s-6.6,2.1-6.8,7l0,3.2H0V22h16V10.8H14.8z M3.2,7.6c0.2-3.7,2.7-5,4.8-5
    c2.1,0,4.6,1.3,4.8,5v3.2H3.2l0-2.7L3.2,7.6z M14,20H2v-7.2h12V20z" />
  </SvgIcon>
);

const ProfileIcon = ({classVariant}) => (
  <SvgIcon 
    viewBox="0 0 56 56"
    ariaLabel="User Menu"
    classVariant={[classVariant]}>
    <path fill="#000000" d="M35.4,37.7c4.9-2.6,8.3-7.8,8.3-13.7c0-8.6-7-15.6-15.6-15.6c-8.6,0-15.6,7-15.6,15.6c0,5.9,3.3,11,8.1,13.7
	C11.5,40.1,4.2,47.1,1.3,56h3.2C8,46.5,17.1,39.7,27.9,39.7c10.7,0,19.9,6.8,23.4,16.3h3.2C51.6,47.1,44.4,40.2,35.4,37.7z M15.5,24
	c0-6.9,5.6-12.6,12.6-12.6S40.6,17.1,40.6,24S35,36.5,28.1,36.5S15.5,30.9,15.5,24z"/>
  </SvgIcon>
);


const SaveIcon = ({classVariant}) => (
  <SvgIcon 
    viewBox="0 0 22 22"
    ariaLabel="Save Note"
    classVariant={["editor__buttons--svg", classVariant]}>
    <path fill="#000000" d="M18.5,0H0v22h22V3.5L18.5,0z M6.9,1.7h8.2v5.2H6.9V1.7z M16.5,20.3H5.5v-8.8h11.1V20.3z M20.3,20.3h-2.4V10.1H4.1v10.2H1.7
		V1.7h3.8v6.6h10.9V1.7h1.4l2.5,2.5V20.3z"/>
    <path fill="#000000" d="M10.9,5.7h3.7V2h-3.7V5.7z M11.6,2.7h2.3V5h-2.3V2.7z"/>
  </SvgIcon>
);

const MarkdownIcon = ({classVariant}) => (
  <SvgIcon 
    viewBox="0 0 50 24"
    ariaLabel="Toggle Preview/Editor"
    classVariant={["editor__buttons--svg", "editor__buttons--markdown", classVariant]}>
    <polygon fill="#000000"
      points="0,24 0,0 7.1,0 14.1,8.8 21.2,0 28.2,0 28.2,24 21.2,24 21.2,10.2 14.1,19.1 7.1,10.2 7.1,24 " />
    <polygon fill="#000000"
      points="39.4,24 28.8,12.4 35.9,12.4 35.9,0 42.9,0 42.9,12.4 50,12.4 " />
  </SvgIcon>
);

const FileIcon = ({classVariant}) => (
  <SvgIcon 
    viewBox="0 0 14 16"
    ariaLabel="Export File"
    classVariant={["editor__buttons--svg", classVariant]}>
    <path d="M1 15V1H8L13 6V15H1Z" stroke="#000000" strokeWidth="1.5" />
    <line x1="3" y1="6" x2="10" y2="6" stroke="#000000" strokeWidth="1.5" />
    <line x1="3" y1="9" x2="10" y2="9" stroke="#000000" strokeWidth="1.5" />
    <line x1="3" y1="12" x2="10" y2="12" stroke="#000000" strokeWidth="1.5" />
  </SvgIcon>
);

const SpinnerIcon = ({classVariant}) => (
  <SvgIcon 
    viewBox="0 0 60 60"
    ariaLabel="Loading..."
    classVariant={[classVariant]}>
    <path fill="#ECEAEC" d="M30,8c12.1,0,22,9.9,22,22s-9.9,22-22,22C17.9,52,8,42.1,8,30S17.9,8,30,8 M30,0C13.4,0,0,13.4,0,30
	s13.4,30,30,30s30-13.4,30-30S46.6,0,30,0L30,0z"/>
    <path fill="#282C34" d="M60,30h-8c0,12.1-9.9,22-22,22v8C46.6,60,60,46.6,60,30z"/>
  </SvgIcon>
);

const DeleteIcon = ({classVariant}) => (
  <SvgIcon 
    viewBox="0 0 22 22"
    ariaLabel="Delete"
    classVariant={["editor__buttons--svg", classVariant]}>
    <polygon fill="#000000" points="21.4,2.4 19.6,0.6 11,9.2 2.4,0.6 0.6,2.4 9.2,11 0.6,19.6 2.4,21.4 11,12.8 19.6,21.4 21.4,19.6 12.8,11 "/>
  </SvgIcon>
);

export {
  SidebarOpenIcon,
  CloseIcon,
  LockIcon,
  UnlockIcon,
  ProfileIcon,
  SaveIcon,
  MarkdownIcon,
  FileIcon,
  SpinnerIcon,
  DeleteIcon,
}