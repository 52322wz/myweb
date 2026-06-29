import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://grjwfvwowmnkatdrubss.supabase.co'
const supabaseAnonKey = 'sb_publishable_fJHRbldjhTFfaeLGzBlbqw_OLHMrkB3'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const BUCKET = 'photos'

// ==================== Photos ====================

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
    .filter(f => !f.name.startsWith('.'))
    .map(file => ({
      id: file.id || file.name,
      name: file.name,
      src: getPhotoUrl(file.name),
      uploadedAt: file.created_at,
    }))
}

export function getPhotoUrl(fileName) {
  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(fileName)
  return data.publicUrl
}

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

export async function deletePhoto(fileName) {
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([fileName])

  if (error) throw error
}

// ==================== AI Database ====================

/** Get all resume entries */
export async function getResumeData() {
  const { data, error } = await supabase
    .from('resume_data')
    .select('*')
    .order('order_num')

  if (error) { console.error(error); return [] }
  return data
}

/** Save a resume entry */
export async function saveResumeEntry(entry) {
  const { error } = await supabase.from('resume_data').upsert(entry)
  if (error) throw error
}

/** Delete a resume entry */
export async function deleteResumeEntry(id) {
  const { error } = await supabase.from('resume_data').delete().eq('id', id)
  if (error) throw error
}

/** Get all projects */
export async function getProjects() {
  const { data, error } = await supabase.from('projects').select('*')
  if (error) { console.error(error); return [] }
  return data
}

export async function saveProject(project) {
  const { error } = await supabase.from('projects').upsert(project)
  if (error) throw error
}

export async function deleteProject(id) {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

/** Get all documents */
export async function getDocuments() {
  const { data, error } = await supabase
    .from('documents')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) { console.error(error); return [] }
  return data
}

export async function saveDocument(doc) {
  const { error } = await supabase.from('documents').upsert(doc)
  if (error) throw error
}

export async function deleteDocument(id) {
  const { error } = await supabase.from('documents').delete().eq('id', id)
  if (error) throw error
}

// ==================== AI Chat (Edge Function) ====================

const EDGE_URL = `${supabaseUrl}/functions/v1/ai-chat`

export async function aiChat({ mode, query, history = [] }) {
  const res = await fetch(EDGE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${supabaseAnonKey}`,
    },
    body: JSON.stringify({ mode, query, history }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }))
    throw new Error(err.message || 'AI 请求失败')
  }

  return res.json()
}
