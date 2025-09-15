import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import ProfileModal from './ProfileModal';
import { useForm } from '../context/FormContext';

/**
 * Responsive, accessible navigation bar for TruckWheel
 * - Fixed at top with shadow
 * - Left: circular logo + brand
 * - Right: nav links, search, profile avatar
 * - Mobile: hamburger toggles a vertical dropdown
 */

const NAV_HEIGHT_PX = 70;

const NavBarWrapper = styled.nav`
  position: fixed;
  top: ${props => props.$isFormOpen ? '-100%' : '0'};
  left: 0;
  transition: top 0.3s ease-in-out;
  right: 0;
  height: ${NAV_HEIGHT_PX}px;

  /* Reduce transparency: add semi-opaque backdrop color */
  background: rgba(15, 23, 42, 0.8);

  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.15);
  z-index: 1000; /* Lower than modal overlay's z-index of 2000 */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

`;

const AddListingContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const AddListingButton = styled(Link)`
  text-decoration: none;
  padding: 10px 14px;
  border-radius: 10px;
  font-weight: 600;
  color: #ffffff;
  background: #000000;
  border: 1px solid #000000;
  transition: all 160ms ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;

  &:hover {
    background: #111111;
  }

  &:focus-visible {
    outline: 3px solid #d1d5db;
    outline-offset: 2px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 100;
  overflow: hidden;
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-10px')});
  transition: all 0.2s ease;
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: 12px 16px;
  color: #1f2937;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: background 150ms ease;
  text-align: left;
  white-space: nowrap;

  &:hover {
    background: #f3f4f6;
  }

  &:active {
    background: #e5e7eb;
  }
`;

const AddIcon = styled.span`
  color: #ef4444; /* red */
  font-weight: 700;
  margin-right: 8px;
  font-size: 22px;
  line-height: 1;
  display: inline-block;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Logo = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 9999px;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.2);
`;

const Brand = styled.span`
  font-weight: 800;
  font-size: 1.25rem;
  letter-spacing: 0.2px;
  color: #ffffff;
`;

const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  align-items: center;
  gap: 16px;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavLink = styled(Link)`
  position: relative;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  padding: 8px 6px;
  border-radius: 6px;
  transition: color 160ms ease;

  &:hover {
    color: #ffffff;
  }

  &:focus-visible {
    outline: 3px solid #93c5fd;
    outline-offset: 2px;
  }

  &::after {
    content: '';
    position: absolute;
    left: 8px;
    right: 8px;
    bottom: 4px;
    height: 2px;
    background: transparent;
    transition: background 160ms ease;
  }

  &:hover::after {
    background: #ffffff;
  }
`;

const SearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 260px;
  max-width: 40vw;
  padding: 10px 12px;
  padding-left: 36px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 9999px;
  color: #ffffff;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: #93c5fd;
    box-shadow: 0 0 0 3px rgba(147, 197, 253, 0.45);
  }
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 10px;
  color: rgba(255, 255, 255, 0.6);
  pointer-events: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const ProfileLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;

  &:focus-visible {
    outline: 3px solid #93c5fd;
    outline-offset: 4px;
    border-radius: 9999px;
  }
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 9999px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  object-fit: cover;
  object-position: center;
  transition: transform 140ms ease, box-shadow 140ms ease;

  &:hover {
    transform: scale(1.04);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.3);
  }
`;

const HamburgerButton = styled.button`
  display: none;

  @media (max-width: 900px) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  background: transparent;
  border: none;
  color: #ffffff;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  &:focus-visible {
    outline: 3px solid #93c5fd;
    outline-offset: 2px;
  }
`;

const MobileMenu = styled.div`
  position: fixed;
  top: ${NAV_HEIGHT_PX}px;
  left: 0;
  right: 0;
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 999;
  display: ${({ open }) => (open ? 'block' : 'none')};

  @media (min-width: 901px) {
    display: none;
  }
`;

const MobileMenuInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 16px 16px;
  display: grid;
  gap: 10px;
`;

const MobileSearchForm = styled(SearchForm)`
  order: -1;
`;

const MobileSearchInput = styled(SearchInput)`
  width: 100%;
  max-width: 100%;
`;

const MobileLinks = styled.ul`
  list-style: none;
  margin: 0;
  padding: 6px 0 0 0;
  display: grid;
  gap: 6px;
`;

const MobileLink = styled(Link)`
  display: block;
  padding: 12px 10px;
  border-radius: 10px;
  text-decoration: none;
  color: #ffffff;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  &:focus-visible {
    outline: 3px solid #93c5fd;
    outline-offset: 2px;
  }
`;

export default function Navbar() {
  const { isFormOpen } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null); // User state will be managed by parent component or context in a real app
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileOpen && !event.target.closest('[data-profile-dropdown]')) {
        setProfileOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileOpen]);
  
  // Style for dropdown links
  const dropdownLinkStyle = {
    display: 'block',
    padding: '10px 16px',
    color: '#111827',
    textDecoration: 'none',
    fontSize: '14px',
    transition: 'background-color 0.2s',
    textAlign: 'left',
    width: '100%',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#f9fafb'
    }
  };

  const navigate = useNavigate();

  // Close menu when resizing to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) {
        if (isOpen) setIsOpen(false);
      } else {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('q')?.toString().trim();
    if (query) {
      const enc = encodeURIComponent(query);
      navigate(`/search?q=${enc}`);
    }
    setIsOpen(false);
  };

  // Avatar source based on user state
  const avatarSrc = user?.photoUrl || 'https://placehold.co/72x72/png?text=PW';

  return (
    <>
      <NavBarWrapper $isFormOpen={isFormOpen} aria-label="Primary">
        <Inner>
          <LeftGroup>
            <Link to="/" aria-label="Go to TruckWheel home">
              <Logo
                src="images/logo.png"
                alt="TruckWheel logo"
              />
            </Link>
            <Brand>TrucksWheel</Brand>
          </LeftGroup>

          <RightGroup>
            <NavLinks aria-label="Primary navigation">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/listing">Listing</NavLink></li>
              <li><NavLink to="/seller">Seller</NavLink></li>
              <li><NavLink to="/news">News</NavLink></li>
              <li><NavLink to="/about">About Us</NavLink></li>
            </NavLinks>

            <SearchForm role="search" aria-label="Site search" onSubmit={handleSearchSubmit}>
              <SearchIcon aria-hidden="true">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SearchIcon>
              <SearchInput
                name="q"
                type="search"
                placeholder="Search…"
                aria-label="Search site"
              />
            </SearchForm>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  position: 'relative'
                }}
                aria-label="View profile"
                aria-expanded={profileOpen}
              >
                <ProfileImg
                  src={avatarSrc}
                  alt="Profile"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/72x72/png?text=PW'; }}
                />
              </button>
              {profileOpen && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: '8px',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  minWidth: '200px',
                  zIndex: 1000,
                  overflow: 'hidden',
                  border: '1px solid #e5e7eb'
                }}>
                  {user ? (
                    <>
                      <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                          <img 
                            src={avatarSrc} 
                            alt={user.name || 'User'} 
                            style={{
                              width: '48px',
                              height: '48px',
                              borderRadius: '50%',
                              objectFit: 'cover'
                            }}
                          />
                          <div>
                            <div style={{ fontWeight: '600', color: '#111827' }}>{user.name || 'User'}</div>
                            <div style={{ fontSize: '14px', color: '#6b7280' }}>{user.email || ''}</div>
                          </div>
                        </div>
                      </div>
                      <div style={{ padding: '8px 0' }}>
                        <a href="/profile" style={dropdownLinkStyle}>
                          My Profile
                        </a>
                        <a href="/settings" style={dropdownLinkStyle}>
                          Settings
                        </a>
                        <button 
                          onClick={() => {
                            setProfileOpen(false);
                          }}
                          style={{
                            ...dropdownLinkStyle,
                            borderTop: '1px solid #e5e7eb',
                            color: '#ef4444',
                            marginTop: '4px',
                            paddingTop: '8px'
                          }}
                        >
                          Sign Out
                        </button>
                      </div>
                    </>
                  ) : (
                    <div style={{ padding: '16px' }}>
                      <p style={{ marginBottom: '12px', color: '#4b5563' }}>You are not signed in</p>
                      <a 
                        href="/auth" 
                        style={{
                          display: 'block',
                          textAlign: 'center',
                          padding: '8px 12px',
                          backgroundColor: '#3b82f6',
                          color: 'white',
                          borderRadius: '6px',
                          fontWeight: '500',
                          textDecoration: 'none'
                        }}
                      >
                        Sign In
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Click outside handler */}
            {profileOpen && (
              <div 
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 999
                }}
                onClick={() => setProfileOpen(false)}
              />
            )}
            <AddListingContainer>
              <AddListingButton 
                to="/auth" 
                aria-label="Add listing options" 
                aria-expanded={isDropdownOpen}
                onClick={(e) => {
                  e.preventDefault();
                  setIsDropdownOpen(!isDropdownOpen);
                }}
              >
                <AddIcon aria-hidden>+</AddIcon>
                Add Listing
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginLeft: '4px' }}>
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </AddListingButton>
              <DropdownMenu $isOpen={isDropdownOpen}>
                <DropdownItem 
                  to={user ? "/add-listing" : "/auth?redirect=/add-listing"}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    if (!user) {
                      navigate('/auth');
                    }
                  }}
                >
                  List Light Vehicles
                </DropdownItem>
                <DropdownItem 
                  to={user ? "/heavy-vehicles" : "/auth?redirect=/heavy-vehicles"}
                  onClick={() => {
                    setIsDropdownOpen(false);
                    if (!user) {
                      navigate('/auth');
                    }
                  }}
                >
                  List Heavy Vehicles
                </DropdownItem>
              </DropdownMenu>
            </AddListingContainer>
          </RightGroup>

          <HamburgerButton
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-controls="mobile-menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((v) => !v)}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </HamburgerButton>
        </Inner>
      </NavBarWrapper>

      {/* Mobile dropdown */}
      <MobileMenu id="mobile-menu" role="region" aria-label="Mobile menu" open={isOpen}>
        <MobileMenuInner>
          <MobileSearchForm role="search" aria-label="Site search (mobile)" onSubmit={handleSearchSubmit}>
            <SearchIcon aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M21 21l-4.2-4.2M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </SearchIcon>
            <MobileSearchInput
              name="q"
              type="search"
              placeholder="Search…"
              aria-label="Search site"
            />
          </MobileSearchForm>

          <MobileLinks aria-label="Primary navigation (mobile)">
            <li><MobileLink to="/" onClick={() => setIsOpen(false)}>Home</MobileLink></li>
            <li><MobileLink to="/about" onClick={() => setIsOpen(false)}>About Us</MobileLink></li>
            <li><MobileLink to="/listing" onClick={() => setIsOpen(false)}>Listing</MobileLink></li>
            <li><MobileLink to="/seller" onClick={() => setIsOpen(false)}>Seller</MobileLink></li>
            <li><MobileLink to="/news" onClick={() => setIsOpen(false)}>News</MobileLink></li>
            <li>
              <MobileLink 
                to={user ? "/profile" : "/auth?redirect=/profile"}
                onClick={() => {
                  setIsOpen(false);
                  if (!user) {
                    navigate('/auth');
                  }
                }}
              >
                Profile
              </MobileLink>
            </li>
            <li>
              <MobileLink 
                to={user ? "/add-listing" : "/auth?redirect=/add-listing"}
                onClick={() => {
                  setIsOpen(false);
                  if (!user) {
                    navigate('/auth');
                  }
                }}
              >
                <AddIcon aria-hidden>+</AddIcon>
                List Light Vehicle
              </MobileLink>
            </li>
            <li>
              <MobileLink 
                to={user ? "/heavy-vehicles" : "/auth?redirect=/heavy-vehicles"}
                onClick={() => {
                  setIsOpen(false);
                  if (!user) {
                    navigate('/auth');
                  }
                }}
              >
                <AddIcon aria-hidden>+</AddIcon>
                List Heavy Vehicle
              </MobileLink>
            </li>
          </MobileLinks>
        </MobileMenuInner>
      </MobileMenu>
      <ProfileModal
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        onEdit={() => {
          setProfileOpen(false);
          navigate('/auth');
        }}
        onSignout={() => {
          setProfileOpen(false);
        }}
      />
    </>
  );
}

// Optional helper to offset page content if needed
export const NavSpacer = styled.div`
  height: ${NAV_HEIGHT_PX}px;
`;


