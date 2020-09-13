import React from 'react';
import PropTypes from 'prop-types';

const SvgIcon = (props) => (
  <svg 
    version="1.1"
    viewBox={props.viewBox}
    aria-labelledby={props.ariaLabel}
    title={props.title}
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
    ariaLabel="sidebarOpenTitle"
    title="Open Sidebar"
    classVariant={["sidebar__toggle--svg", classVariant]}>
    <line x1="0" x2="100%" y1="2" y2="2" stroke="#FFFFFF" strokeWidth="4" />
    <line x1="0" x2="100%" y1="15" y2="15" stroke="#FFFFFF" strokeWidth="4" />
    <line x1="0" x2="100%" y1="28" y2="28" stroke="#FFFFFF" strokeWidth="4" />
  </SvgIcon>
);

const SidebarCloseIcon = ({classVariant}) => (
  <SvgIcon 
    viewBox="0 0 20 20"
    ariaLabel="sidebarCloseTitle"
    title="Close Sidebar"
    classVariant={["sidebar__toggle--svg", classVariant]}>
    <line x1="2" x2="18" y1="2" y2="18" stroke="#FFFFFF" strokeWidth="5" />
    <line x1="18" x2="2" y1="2" y2="18" stroke="#FFFFFF" strokeWidth="5" />
  </SvgIcon>
);

const UnlockIcon = ({classVariant}) => (
<SvgIcon 
  viewBox="0 0 16 22"
  ariaLabel="unlockedNoteTitle"
  title="Unlock Note"
  classVariant={["editor__buttons--svg", classVariant]}>
  <path d="M3.2,10.8l0-3.2c0.2-3.5,2.4-5,4.6-5s4.4,1.6,4.6,5l2-0.1c-0.2-4.8-3.6-7-6.6-7c-3,0-6.4,2.2-6.6,7v3.2H0V22h16
	V10.8H3.2z M14,20H2v-7.2h12V20z" fill="#6a6a6a" />
</SvgIcon>
);

const LockIcon = ({classVariant}) => (
  <SvgIcon 
    viewBox="0 0 16 22"
    ariaLabel="lockedNoteTitle"
    title="Lock Note"
    classVariant={["editor__buttons--svg", classVariant]}>
    <path 
      style={{fill: 'black'}}
      d="M14.8,10.8l0-3.2C14.6,2.8,11.2,0.6,8,0.6s-6.6,2.1-6.8,7l0,3.2H0V22h16V10.8H14.8z M3.2,7.6c0.2-3.7,2.7-5,4.8-5
    c2.1,0,4.6,1.3,4.8,5v3.2H3.2l0-2.7L3.2,7.6z M14,20H2v-7.2h12V20z" />
  </SvgIcon>
);

const MarkdownIcon = ({classVariant}) => (
  <SvgIcon 
    viewBox="0 0 50 24"
    ariaLabel="markdownToggleTitle"
    title="Markdown Toggle"
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
    ariaLabel="fileExportTitle"
    title="File Export"
    classVariant={["editor__buttons--svg", classVariant]}>
    <path d="M1 15V1H8L13 6V15H1Z" stroke="#000000" strokeWidth="1.5" />
    <line x1="3" y1="6" x2="10" y2="6" stroke="#000000" strokeWidth="1.5" />
    <line x1="3" y1="9" x2="10" y2="9" stroke="#000000" strokeWidth="1.5" />
    <line x1="3" y1="12" x2="10" y2="12" stroke="#000000" strokeWidth="1.5" />
  </SvgIcon>
);

const UserPicPlaceholderIcon = ({classVariant}) => (
  <SvgIcon 
    viewBox="0 0 128 128"
    ariaLabel="userPicPlaceholderTitle"
    title="User Pic Placeholder"
    classVariant={[classVariant]}>
    <circle cx="64" cy="64" r="64"
      style={{fill: '#9d9b9c'}}/>
  </SvgIcon>
);

export {
  SidebarOpenIcon,
  SidebarCloseIcon,
  LockIcon,
  UnlockIcon,
  MarkdownIcon,
  FileIcon,
  UserPicPlaceholderIcon,
}