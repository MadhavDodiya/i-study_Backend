import React, { useState, useRef, useEffect } from 'react';

const AdminHeader = ({ onMenuClick, onLogout, user }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const notifications = [
    { title: 'New user registered', desc: 'Sarah K. just signed up', time: '2m ago', unread: true },
    { title: 'Course published', desc: 'React Masterclass is live', time: '1h ago', unread: true },
    { title: 'Order #1082 placed', desc: '$129 — UI Design Course', time: '3h ago', unread: false },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500&display=swap');
        .ah-root { font-family:'DM Sans',sans-serif; }
        .ah-iconbtn { background:none; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:8px; padding:8px; color:#64748b; transition:background 0.15s,color 0.15s; }
        .ah-iconbtn:hover { background:#f1f5f9; color:#1e293b; }
        .ah-notif { position:absolute; top:100%; right:0; margin-top:8px; background:#fff; border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,0.1); min-width:320px; z-index:1000; border:1px solid #e2e8f0; }
        .ah-notif-item { padding:12px 16px; border-bottom:1px solid #f1f5f9; }
        .ah-notif-item:last-child { border-bottom:none; }
        .ah-notif-item.unread { background:#f0f4ff; }
        .ah-dropdown { position:absolute; top:100%; right:0; margin-top:8px; background:#fff; border-radius:8px; box-shadow:0 10px 25px rgba(0,0,0,0.1); min-width:220px; z-index:1000; border:1px solid #e2e8f0; }
        .ah-dropdown-item { padding:12px 16px; border-bottom:1px solid #f1f5f9; color:#64748b; cursor:pointer; transition:background 0.15s; font-size:13px; }
        .ah-dropdown-item:last-child { border-bottom:none; }
        .ah-dropdown-item:hover { background:#f8fafc; color:#1e293b; }
      `}</style>

      <div className="ah-root" style={{
        borderBottom: '1px solid #e2e8f0',
        background: '#fff',
        padding: '16px 28px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {/* ✅ Left Side - Menu and Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={onMenuClick} 
            className="ah-iconbtn" 
            style={{ display: window.innerWidth <= 768 ? 'flex' : 'none' }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <input
            type="text"
            placeholder="Search..."
            style={{
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '8px 12px',
              fontSize: '13px',
              color: '#64748b',
              minWidth: '200px',
              outline: 'none',
            }}
          />
        </div>

        {/* ✅ Right Side - Notifications and Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative' }}>
          {/* ✅ Notifications */}
          <div style={{ position: 'relative' }} ref={notifRef}>
            <button
              className="ah-iconbtn"
              onClick={() => setNotifOpen(!notifOpen)}
              style={{ position: 'relative' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
              <span style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                background: '#ef4444',
                color: '#fff',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px',
                fontWeight: '700',
              }}>
                3
              </span>
            </button>

            {notifOpen && (
              <div className="ah-notif">
                <div style={{ padding: '12px 16px', fontWeight: '600', borderBottom: '1px solid #f1f5f9', fontSize: '13px', color: '#0f172a' }}>
                  Notifications
                </div>
                {notifications.map((notif, idx) => (
                  <div key={idx} className={`ah-notif-item ${notif.unread ? 'unread' : ''}`}>
                    <div style={{ fontWeight: '600', fontSize: '13px', color: '#0f172a' }}>{notif.title}</div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>{notif.desc}</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>{notif.time}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ✅ Profile Dropdown */}
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
              className="ah-iconbtn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                background: '#f1f5f9',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                color: '#667eea',
              }}
            >
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </button>

            {dropdownOpen && (
              <div className="ah-dropdown">
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #f1f5f9' }}>
                  <div style={{ fontWeight: '600', fontSize: '13px', color: '#0f172a' }}>
                    {user?.name || 'Administrator'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                    {user?.email || 'admin@i-study.com'}
                  </div>
                </div>
                <div className="ah-dropdown-item">Profile Settings</div>
                <div className="ah-dropdown-item">Change Password</div>
                <div
                  className="ah-dropdown-item"
                  onClick={onLogout}
                  style={{ color: '#ef4444', fontWeight: '600' }}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHeader;