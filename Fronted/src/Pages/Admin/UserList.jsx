import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../api';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || 'Failed to load users.');
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleEdit = (userId) => console.log('Edit', userId);

  const handleDelete = (userId) => {
    if (!window.confirm('Delete this user?')) return;
    setUsers(prev => prev.filter(u => u._id !== userId));
  };

  const avatarColors = ['#667eea','#f093fb','#4facfe','#f59e0b','#f5576c','#43e97b','#fa709a','#30cfd0'];
  const getColor = (name) => avatarColors[(name?.charCodeAt(0) || 0) % avatarColors.length];

  const filtered = users.filter(u => {
    const matchSearch = !search || u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || (filter === 'admin' ? u.isAdmin : !u.isAdmin);
    return matchSearch && matchFilter;
  });

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:300, gap:12 }}>
      <div style={{ width:32, height:32, border:'3px solid #e2e8f0', borderTopColor:'#667eea', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <span style={{ color:'#94a3b8', fontSize:14 }}>Loading users...</span>
    </div>
  );

  if (error) return (
    <div style={{ display:'flex', alignItems:'center', gap:10, background:'#fff5f5', border:'1px solid #fecaca', borderRadius:12, padding:'14px 18px', color:'#dc2626', fontSize:13 }}>
      <svg style={{ width:18, height:18, flexShrink:0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
      {error}
    </div>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        .ul-root { font-family:'DM Sans',sans-serif; }
        .ul-panel { background:#fff; border-radius:16px; border:1px solid rgba(0,0,0,0.055); box-shadow:0 2px 12px rgba(0,0,0,0.05); }
        .ul-row { transition:background 0.13s; }
        .ul-row:hover { background:#fafbff; }
        .ul-editbtn { background:none; border:none; cursor:pointer; font-size:12.5px; font-weight:500; color:#667eea; font-family:inherit; padding:5px 10px; border-radius:6px; transition:background 0.13s,color 0.13s; }
        .ul-editbtn:hover { background:#eef2ff; color:#4338ca; }
        .ul-delbtn { background:none; border:none; cursor:pointer; font-size:12.5px; font-weight:500; color:#f5576c; font-family:inherit; padding:5px 10px; border-radius:6px; transition:background 0.13s; }
        .ul-delbtn:hover { background:#fff0f3; }
        .ul-searchinput { padding:9px 12px 9px 36px; font-size:13px; border-radius:9px; border:1px solid #e2e8f0; background:#f8fafc; color:#374151; outline:none; width:220px; font-family:'DM Sans',sans-serif; transition:border-color 0.15s,box-shadow 0.15s; }
        .ul-searchinput:focus { border-color:#667eea; box-shadow:0 0 0 3px rgba(102,126,234,0.12); background:#fff; }
        .ul-filterbtn { padding:8px 14px; border-radius:9px; border:1px solid #e2e8f0; background:#f8fafc; font-size:12.5px; font-weight:500; color:#64748b; cursor:pointer; transition:all 0.15s; font-family:inherit; }
        .ul-filterbtn.active { background:#667eea; color:#fff; border-color:#667eea; }
        .ul-filterbtn:hover:not(.active) { background:#f1f5f9; color:#374151; }
        .ul-addbtn { display:flex; align-items:center; gap:7px; padding:9px 18px; border-radius:10px; background:linear-gradient(135deg,#667eea,#764ba2); color:#fff; font-size:13px; font-weight:600; border:none; cursor:pointer; font-family:inherit; transition:transform 0.15s,box-shadow 0.15s; box-shadow:0 4px 14px rgba(102,126,234,0.4); }
        .ul-addbtn:hover { transform:translateY(-1px); box-shadow:0 6px 20px rgba(102,126,234,0.5); }
      `}</style>
      <div className="ul-root" style={{ display:'flex', flexDirection:'column', gap:20 }}>

        {/* Header */}
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between' }}>
          <div>
            <p style={{ color:'#94a3b8', fontSize:12, fontWeight:500, letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:4 }}>Management</p>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:800, color:'#0f172a', lineHeight:1 }}>Users</h1>
          </div>
          <button className="ul-addbtn">
            <svg style={{ width:15, height:15 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            Add User
          </button>
        </div>

        {/* Toolbar */}
        <div className="ul-panel" style={{ padding:'16px 20px', display:'flex', alignItems:'center', gap:12, flexWrap:'wrap' }}>
          <div style={{ position:'relative' }}>
            <input type="text" placeholder="Search users..." className="ul-searchinput" value={search} onChange={e => setSearch(e.target.value)}/>
            <svg style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', width:14, height:14, color:'#94a3b8', pointerEvents:'none' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"/>
            </svg>
          </div>
          <div style={{ display:'flex', gap:6, marginLeft:'auto' }}>
            {['all','user','admin'].map(f => (
              <button key={f} className={`ul-filterbtn${filter===f?' active':''}`} onClick={() => setFilter(f)}>
                {f.charAt(0).toUpperCase()+f.slice(1)}
              </button>
            ))}
          </div>
          <span style={{ fontSize:12, color:'#94a3b8' }}>{filtered.length} results</span>
        </div>

        {/* Table */}
        <div className="ul-panel" style={{ overflow:'hidden' }}>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse' }}>
              <thead>
                <tr style={{ borderBottom:'1px solid #f1f5f9', background:'#fafbff' }}>
                  {['User','Email','Role','Status','Actions'].map((col, i) => (
                    <th key={col} style={{ padding:'12px 20px', fontSize:11, fontWeight:600, color:'#94a3b8', textTransform:'uppercase', letterSpacing:'0.08em', textAlign: i===4?'right':'left' }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ padding:'48px 20px', textAlign:'center', color:'#94a3b8', fontSize:13 }}>
                      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                        <svg style={{ width:36, height:36, color:'#e2e8f0' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-4a4 4 0 11-8 0 4 4 0 018 0z"/>
                        </svg>
                        No users found
                      </div>
                    </td>
                  </tr>
                ) : filtered.map((user) => {
                  const color = getColor(user.name);
                  return (
                    <tr key={user._id} className="ul-row" style={{ borderBottom:'1px solid #f8fafc' }}>
                      <td style={{ padding:'14px 20px', whiteSpace:'nowrap' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:11 }}>
                          <div style={{ width:34, height:34, borderRadius:'50%', background:color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#fff', flexShrink:0, boxShadow:`0 2px 8px ${color}55` }}>
                            {user.name?.charAt(0).toUpperCase() || '?'}
                          </div>
                          <span style={{ fontSize:13.5, fontWeight:500, color:'#1e293b' }}>{user.name}</span>
                        </div>
                      </td>
                      <td style={{ padding:'14px 20px', whiteSpace:'nowrap', fontSize:13, color:'#64748b' }}>{user.email}</td>
                      <td style={{ padding:'14px 20px', whiteSpace:'nowrap' }}>
                        <span style={{ fontSize:11.5, fontWeight:600, padding:'3px 10px', borderRadius:20, background: user.isAdmin?'rgba(102,126,234,0.1)':'rgba(100,116,139,0.1)', color: user.isAdmin?'#667eea':'#64748b' }}>
                          {user.isAdmin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td style={{ padding:'14px 20px', whiteSpace:'nowrap' }}>
                        <span style={{ display:'flex', alignItems:'center', gap:6, fontSize:12, color:'#22c55e', fontWeight:500 }}>
                          <span style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e', display:'inline-block' }}/>
                          Active
                        </span>
                      </td>
                      <td style={{ padding:'14px 20px', whiteSpace:'nowrap', textAlign:'right' }}>
                        <button className="ul-editbtn" onClick={() => handleEdit(user._id)}>Edit</button>
                        <button className="ul-delbtn" onClick={() => handleDelete(user._id)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserList;