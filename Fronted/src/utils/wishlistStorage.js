const WISHLIST_STORAGE_KEY = "wishlist_course_ids";

function normalizeIds(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return [...new Set(value.map((id) => Number(id)).filter((id) => Number.isInteger(id)))];
}

export function getWishlistIds() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    return normalizeIds(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function saveWishlistIds(ids) {
  const normalizedIds = normalizeIds(ids);
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(normalizedIds));
  return normalizedIds;
}

export function addCourseToWishlist(course) {
  if (!course || !Number.isInteger(Number(course.id))) {
    return getWishlistIds();
  }

  const courseId = Number(course.id);
  const currentIds = getWishlistIds();
  if (currentIds.includes(courseId)) {
    return currentIds;
  }

  return saveWishlistIds([...currentIds, courseId]);
}

export function removeCourseFromWishlist(courseId) {
  const targetId = Number(courseId);
  const updatedIds = getWishlistIds().filter((id) => id !== targetId);
  return saveWishlistIds(updatedIds);
}

export function isCourseWishlisted(courseId) {
  return getWishlistIds().includes(Number(courseId));
}
