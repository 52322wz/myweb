/**
 * Photo storage using localStorage.
 * Each photo: { id, src (base64 data URL), name, uploadedAt }
 */

const STORAGE_KEY = 'portfolio_photos'

export function getPhotos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function savePhoto(photo) {
  const photos = getPhotos()
  photos.push(photo)
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(photos))
    return true
  } catch {
    // localStorage full — remove oldest and retry once
    if (photos.length > 1) {
      photos.shift()
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(photos))
        return true
      } catch {
        return false
      }
    }
    return false
  }
}

export function removePhoto(id) {
  const photos = getPhotos().filter(p => p.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos))
}

export function getPhotoCount() {
  return getPhotos().length
}
