import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target)) setNotifOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => navigate('/login');

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
        .ah-iconbtn { background:none; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; border-radius:8px; padding:7px; color:#64748b; transition:background 0.15s,color 0.15s; }
        .ah-iconbtn:hover { background:#f1f5f9; color:#1e293b; }
        .ah-dropdown { position:absolute; right:0; top:calc(100% + 10px); background:#fff; border:1px solid rgba(0,0,0,0.07); border-radius:14px; box-shadow:0 10px 40px rgba(0,0,0,0.12); z-index:200; animation:ahDrop 0.15s ease; }
        @keyframes ahDrop { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        .ah-dditem { display:flex; align-items:center; gap:9px; padding:9px 14px; font-size:13px; color:#374151; text-decoration:none; cursor:pointer; border-radius:8px; margin:2px 6px; transition:background 0.13s; border:none; background:none; font-family:inherit; width:calc(100% - 12px); text-align:left; }
        .ah-dditem:hover { background:#f8fafc; color:#111827; }
        .ah-dditem-red { color:#dc2626; }
        .ah-dditem-red:hover { background:#fff5f5; }
        .ah-searchinput { padding:7px 12px 7px 34px; font-size:13px; border-radius:8px; border:1px solid #e2e8f0; background:#f8fafc; color:#374151; outline:none; width:190px; font-family:'DM Sans',sans-serif; transition:border-color 0.15s,box-shadow 0.15s; }
        .ah-searchinput:focus { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,0.12); }
        .ah-avatarbtn { display:flex; align-items:center; gap:8px; padding:5px 10px 5px 5px; border-radius:10px; border:1px solid #e2e8f0; background:#fff; cursor:pointer; transition:border-color 0.15s,box-shadow 0.15s; font-family:'DM Sans',sans-serif; }
        .ah-avatarbtn:hover { border-color:#f59e0b; box-shadow:0 0 0 3px rgba(245,158,11,0.1); }
      `}</style>
      <header className="ah-root" style={{ display:'flex', alignItems:'center', gap:12, padding:'0 24px', height:64, background:'#fff', borderBottom:'1px solid rgba(0,0,0,0.07)', boxShadow:'0 1px 0 rgba(0,0,0,0.04)', flexShrink:0 }}>

        {/* Breadcrumb */}
        <div style={{ display:'flex', alignItems:'center', gap:6, flex:1 }}>
          <span style={{ color:'#94a3b8', fontSize:13 }}>i-Study</span>
          <svg style={{ width:13, height:13, color:'#cbd5e1' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
          </svg>
          <span style={{ background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.2)', borderRadius:20, padding:'3px 10px', fontSize:11, color:'#d97706', fontWeight:500 }}>Admin</span>
        </div>

        {/* Search */}
        <div style={{ position:'relative' }}>
          <input type="text" placeholder="Search..." className="ah-searchinput" />
          <svg style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', width:14, height:14, color:'#94a3b8', pointerEvents:'none' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
          </svg>
        </div>

        {/* Notifications */}
        <div style={{ position:'relative' }} ref={notifRef}>
          <button className="ah-iconbtn" onClick={() => setNotifOpen(p => !p)} style={{ position:'relative' }}>
            <svg style={{ width:19, height:19 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
            </svg>
            <span style={{ position:'absolute', top:5, right:5, width:7, height:7, borderRadius:'50%', background:'#f59e0b', border:'2px solid #fff' }}/>
          </button>
          {notifOpen && (
            <div className="ah-dropdown" style={{ width:290, padding:'6px 0' }}>
              <div style={{ padding:'10px 16px 10px', borderBottom:'1px solid #f1f5f9' }}>
                <p style={{ fontSize:13, fontWeight:600, color:'#0f172a' }}>Notifications</p>
              </div>
              {notifications.map((n, i) => (
                <div key={i} style={{ display:'flex', gap:10, padding:'10px 14px', cursor:'pointer', transition:'background 0.13s' }}
                  onMouseEnter={e => e.currentTarget.style.background='#f8fafc'}
                  onMouseLeave={e => e.currentTarget.style.background='transparent'}>
                  <div style={{ width:7, height:7, borderRadius:'50%', background:n.unread?'#f59e0b':'#e2e8f0', flexShrink:0, marginTop:5 }}/>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:12.5, fontWeight:500, color:'#1e293b' }}>{n.title}</p>
                    <p style={{ fontSize:11, color:'#94a3b8', marginTop:2 }}>{n.desc}</p>
                  </div>
                  <p style={{ fontSize:10, color:'#cbd5e1', flexShrink:0, marginTop:2 }}>{n.time}</p>
                </div>
              ))}
              <div style={{ padding:'8px 16px 6px', borderTop:'1px solid #f1f5f9' }}>
                <button style={{ fontSize:12, color:'#d97706', fontWeight:500, background:'none', border:'none', cursor:'pointer', padding:0, fontFamily:'inherit' }}>View all →</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ width:1, height:22, background:'#e2e8f0' }}/>

        {/* Avatar */}
        <div style={{ position:'relative' }} ref={dropdownRef}>
          <button className="ah-avatarbtn" onClick={() => setDropdownOpen(p => !p)}>
            <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#f59e0b,#d97706)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#fff' }}>A</div>
            <span style={{ fontSize:13, fontWeight:500, color:'#374151' }}>Admin</span>
            <svg style={{ width:13, height:13, color:'#94a3b8', transform:dropdownOpen?'rotate(180deg)':'none', transition:'transform 0.15s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
          {dropdownOpen && (
            <div className="ah-dropdown" style={{ width:200, padding:'6px 0' }}>
              <div style={{ padding:'10px 14px 10px', borderBottom:'1px solid #f1f5f9' }}>
                <p style={{ fontSize:12.5, fontWeight:600, color:'#0f172a' }}>Administrator</p>
                <p style={{ fontSize:11, color:'#94a3b8', marginTop:2 }}>admin@i-study.com</p>
              </div>
              <a href="/admin/profile" className="ah-dditem">
                <svg style={{ width:14, height:14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                Profile
              </a>
              <a href="/admin/settings" className="ah-dditem">
                <svg style={{ width:14, height:14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>
                Settings
              </a>
              <div style={{ height:1, background:'#f1f5f9', margin:'4px 0' }}/>
              <button onClick={handleLogout} className="ah-dditem ah-dditem-red">
                <svg style={{ width:14, height:14 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default AdminHeader;