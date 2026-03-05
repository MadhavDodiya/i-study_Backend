import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "orders", label: "Orders" },
  { id: "settings", label: "Settings" },
];

function UserPanel() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    let isMounted = true;

    const fetchPanelData = async () => {
      try {
        setIsLoading(true);

        const meResponse = await fetch(`${API_BASE}/api/auth/me`, {
          credentials: "include",
        });

        if (meResponse.status === 401) {
          navigate("/login", { replace: true });
          return;
        }

        if (!meResponse.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const mePayload = await meResponse.json();
        const currentUser = mePayload.user || null;

        const [ordersResponse, cartResponse, wishlistResponse] = await Promise.all([
          fetch(`${API_BASE}/api/orders`, { credentials: "include" }),
          fetch(`${API_BASE}/api/cart`, { credentials: "include" }),
          fetch(`${API_BASE}/api/wishlist`, { credentials: "include" }),
        ]);

        const ordersPayload = ordersResponse.ok ? await ordersResponse.json() : { orders: [] };
        const cartPayload = cartResponse.ok ? await cartResponse.json() : { items: [] };
        const wishlistPayload = wishlistResponse.ok ? await wishlistResponse.json() : { items: [] };

        if (isMounted) {
          setUser(currentUser);
          setOrders(Array.isArray(ordersPayload.orders) ? ordersPayload.orders : []);
          setCartCount(Array.isArray(cartPayload.items) ? cartPayload.items.length : 0);
          setWishlistCount(Array.isArray(wishlistPayload.items) ? wishlistPayload.items.length : 0);
          setErrorMessage("");
        }
      } catch (error) {
        console.error("User panel fetch error:", error);
        if (isMounted) {
          setErrorMessage("Unable to load your dashboard right now.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchPanelData();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const totalSpent = useMemo(
    () => orders.reduce((sum, order) => sum + Number(order.total || 0), 0),
    [orders]
  );

  const recentOrders = useMemo(() => orders.slice(0, 5), [orders]);
  const paidOrders = useMemo(
    () => orders.filter((order) => String(order.status || "").toLowerCase() === "paid").length,
    [orders]
  );

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("User panel logout error:", error);
    }
    navigate("/login", { replace: true });
  };

  if (isLoading) {
    return <div className="container py-5 text-center">Loading your dashboard...</div>;
  }

  return (
    <div className="py-5" style={{ backgroundColor: "#f5f7f9", minHeight: "60vh" }}>
      <div className="container">
        {errorMessage ? (
          <div className="alert alert-warning border-0 shadow-sm" role="alert">
            {errorMessage}
          </div>
        ) : null}

        <div className="row g-4">
          <div className="col-12 col-lg-3">
            <div className="card border-0 shadow-sm">
              <div className="card-body p-3">
                <h5 className="fw-bold mb-1" style={{ color: "#0b2c2c" }}>
                  My Panel
                </h5>
                <p className="text-muted small mb-3">
                  Welcome{user?.name ? `, ${user.name}` : ""}.
                </p>

                <div className="d-grid gap-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      className={`btn text-start ${activeTab === tab.id ? "btn-success" : "btn-outline-secondary"}`}
                      onClick={() => setActiveTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <hr />

                <div className="d-grid gap-2">
                  <Link className="btn btn-outline-success" to="/courses">
                    Browse Courses
                  </Link>
                  {user?.isAdmin ? (
                    <Link className="btn btn-dark" to="/admin/dashboard">
                      Admin Panel
                    </Link>
                  ) : null}
                  <button type="button" className="btn btn-outline-danger" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-9">
            {activeTab === "overview" ? (
              <>
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <p className="text-muted mb-1">My Orders</p>
                        <h3 className="fw-bold mb-0">{orders.length}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <p className="text-muted mb-1">Paid Orders</p>
                        <h3 className="fw-bold mb-0">{paidOrders}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <p className="text-muted mb-1">Cart Items</p>
                        <h3 className="fw-bold mb-0">{cartCount}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-3">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <p className="text-muted mb-1">Wishlist Items</p>
                        <h3 className="fw-bold mb-0">{wishlistCount}</h3>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row g-4">
                  <div className="col-12 col-xl-8">
                    <div className="card border-0 shadow-sm">
                      <div className="card-body">
                        <h5 className="fw-bold mb-3">Recent Orders</h5>
                        {recentOrders.length === 0 ? (
                          <p className="text-muted mb-0">No orders yet.</p>
                        ) : (
                          <div className="table-responsive">
                            <table className="table mb-0">
                              <thead>
                                <tr>
                                  <th>Order ID</th>
                                  <th>Status</th>
                                  <th>Total</th>
                                  <th>Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                {recentOrders.map((order) => (
                                  <tr key={order._id}>
                                    <td className="text-break">{order._id}</td>
                                    <td className="text-capitalize">{order.status || "-"}</td>
                                    <td>${Number(order.total || 0).toFixed(2)}</td>
                                    <td>{order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-xl-4">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <h5 className="fw-bold mb-3">Quick Actions</h5>
                        <div className="d-grid gap-2">
                          <Link className="btn btn-outline-secondary" to="/cart">
                            Open Cart
                          </Link>
                          <Link className="btn btn-outline-secondary" to="/wishlist">
                            Open Wishlist
                          </Link>
                          <Link className="btn btn-outline-secondary" to="/checkout">
                            Go To Checkout
                          </Link>
                          <Link className="btn btn-success" to="/courses">
                            Enroll in Course
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}

            {activeTab === "orders" ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">All My Orders</h5>
                  {orders.length === 0 ? (
                    <p className="text-muted mb-0">No orders yet.</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <thead>
                          <tr>
                            <th>Order ID</th>
                            <th>Status</th>
                            <th>Items</th>
                            <th>Total</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map((order) => (
                            <tr key={order._id}>
                              <td className="text-break">{order._id}</td>
                              <td className="text-capitalize">{order.status || "-"}</td>
                              <td>{Array.isArray(order.items) ? order.items.length : 0}</td>
                              <td>${Number(order.total || 0).toFixed(2)}</td>
                              <td>{order.createdAt ? new Date(order.createdAt).toLocaleString() : "-"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ) : null}

            {activeTab === "settings" ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <h5 className="fw-bold mb-3">Account Settings</h5>

                  <div className="mb-3">
                    <label className="form-label text-muted">Name</label>
                    <input type="text" className="form-control" value={user?.name || ""} readOnly />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Email</label>
                    <input type="text" className="form-control" value={user?.email || ""} readOnly />
                  </div>
                  <div className="mb-3">
                    <label className="form-label text-muted">Role</label>
                    <input
                      type="text"
                      className="form-control"
                      value={user?.isAdmin ? "Admin" : "User"}
                      readOnly
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label text-muted">Total Spent</label>
                    <input type="text" className="form-control" value={`$${Number(totalSpent).toFixed(2)}`} readOnly />
                  </div>

                  <div className="d-flex gap-2 flex-wrap">
                    <button type="button" className="btn btn-outline-danger" onClick={handleLogout}>
                      Logout
                    </button>
                    <Link className="btn btn-outline-secondary" to="/courses">
                      Back To Courses
                    </Link>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
