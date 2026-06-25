import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grjwfvwowmnkatdrubss.supabase.co'
const supabaseAnonKey = 'sb_publishable_fJHRbldjhTFfaeLGzBlbqw_OLHMrkB3'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const BUCKET = 'photos'

/** Get all photos from Supabase Storage (sorted newest first) */
export async function getPhotos() {
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .list('', { sortBy: { column: 'created_at', order: 'desc' } })

  if (error) {
    console.error('Failed to list photos:', error.message)
    return []
  }

  return data
    .filter(f => !f.name.startsWith('.')) // skip hidden files
    .map(file => ({
      id: file.id || file.name,
      name: file.name,
      src: getPhotoUrl(file.name),
      uploadedAt: file.created_at,
    }))
}

/** Get the public URL for a photo */
export function getPhotoUrl(fileName) {
  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName)
  return data.publicUrl
}

/** Upload a photo file (blob) to Supabase */
export async function uploadPhoto(file, originalName) {
  const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_')
  const fileName = `${Date.now()}_${safeName}`

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) throw error
  return { ...data, fileName }
}

/** Delete a photo by file name */
export async function deletePhoto(fileName) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([fileName])

  if (error) throw error
}
