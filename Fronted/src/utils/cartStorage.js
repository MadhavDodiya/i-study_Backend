const CART_STORAGE_KEY = "cart_courses";
const CART_UPDATED_EVENT = "cart-updated";

function normalizeCartItems(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  const map = new Map();

  value.forEach((item) => {
    const courseId = Number(item?.courseId);
    const quantity = Number(item?.quantity);

    if (!Number.isInteger(courseId) || courseId <= 0) {
      return;
    }

    const safeQuantity = Number.isInteger(quantity) && quantity > 0 ? quantity : 1;
    const prevQuantity = map.get(courseId) || 0;
    map.set(courseId, prevQuantity + safeQuantity);
  });

  return Array.from(map, ([courseId, quantity]) => ({ courseId, quantity }));
}

export function getCartItems() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    return normalizeCartItems(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function saveCartItems(items) {
  const normalized = normalizeCartItems(items);
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(normalized));
  window.dispatchEvent(new CustomEvent(CART_UPDATED_EVENT, { detail: normalized }));
  return normalized;
}

export function addCourseToCart(course, quantity = 1) {
  const courseId = Number(course?.id);
  const safeQuantity = Number.isInteger(quantity) && quantity > 0 ? quantity : 1;

  if (!Number.isInteger(courseId) || courseId <= 0) {
    return getCartItems();
  }

  const current = getCartItems();
  const existing = current.find((item) => item.courseId === courseId);

  if (!existing) {
    return saveCartItems([...current, { courseId, quantity: safeQuantity }]);
  }

  return saveCartItems(
    current.map((item) =>
      item.courseId === courseId
        ? { ...item, quantity: item.quantity + safeQuantity }
        : item
    )
  );
}

export function updateCartItemQuantity(courseId, quantity) {
  const targetId = Number(courseId);
  const safeQuantity = Number(quantity);

  if (!Number.isInteger(targetId) || targetId <= 0) {
    return getCartItems();
  }

  if (!Number.isInteger(safeQuantity) || safeQuantity <= 0) {
    return removeCourseFromCart(targetId);
  }

  const updated = getCartItems().map((item) =>
    item.courseId === targetId ? { ...item, quantity: safeQuantity } : item
  );
  return saveCartItems(updated);
}

export function removeCourseFromCart(courseId) {
  const targetId = Number(courseId);
  const updated = getCartItems().filter((item) => item.courseId !== targetId);
  return saveCartItems(updated);
}

export function isCourseInCart(courseId) {
  const targetId = Number(courseId);
  return getCartItems().some((item) => item.courseId === targetId);
}

export function getCartUpdatedEventName() {
  return CART_UPDATED_EVENT;
}
